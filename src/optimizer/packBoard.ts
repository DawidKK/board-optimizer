import { MaxRectsPacker, PACKING_LOGIC, Rectangle } from 'maxrects-packer'
import {
  getUsableBoard,
  inflateSizeForKerf,
  resolveCncCutSettings,
  toBoardCoordinates,
} from './cnc'
import type {
  Board,
  BoardLayout,
  CncCutSettings,
  ElementInput,
  ExpandedElement,
  PackResult,
  PlacedElement,
  QualityMetrics,
} from './types'

const isPositive = (value: number) => Number.isFinite(value) && value > 0
const FLOAT_EPSILON = 1e-6
const BOARD_COUNT_WEIGHT = 1_000_000
const WASTE_AREA_WEIGHT = 1
const SMALL_RECTS_WEIGHT = 2
const FREE_RECTS_COUNT_WEIGHT = 5_000
const LARGEST_FREE_RECT_BONUS = 0.6

export const expandElements = (
  board: Board,
  elements: ElementInput[],
): ExpandedElement[] =>
  elements.flatMap((element, rowIndex) => {
    const quantity = Math.max(0, Math.floor(element.quantity || 0))
    const canRotate = element.canRotate ?? !board.grainDirectionEnabled

    return Array.from({ length: quantity }, (_, index) => ({
      instanceId: `${element.id}-${index + 1}`,
      sourceId: element.id,
      rowNumber: rowIndex + 1,
      itemNumberInRow: index + 1,
      width: element.width,
      height: element.height,
      canRotate,
    }))
  })

type SortStrategy = 'area' | 'longest-edge' | 'shortest-edge' | 'ratio'

const sortExpanded = (
  source: ExpandedElement[],
  strategy: SortStrategy,
): ExpandedElement[] => {
  const sorted = [...source]
  sorted.sort((a, b) => {
    const aArea = a.width * a.height
    const bArea = b.width * b.height
    const aLongest = Math.max(a.width, a.height)
    const bLongest = Math.max(b.width, b.height)
    const aShortest = Math.min(a.width, a.height)
    const bShortest = Math.min(b.width, b.height)
    const aRatio = aLongest / aShortest
    const bRatio = bLongest / bShortest

    const diff =
      strategy === 'area'
        ? bArea - aArea
        : strategy === 'longest-edge'
          ? bLongest - aLongest
          : strategy === 'shortest-edge'
            ? bShortest - aShortest
            : bRatio - aRatio

    if (diff !== 0) {
      return diff
    }

    return a.instanceId.localeCompare(b.instanceId)
  })
  return sorted
}

const emptyQualityMetrics: QualityMetrics = {
  score: 0,
  boardsCount: 0,
  smallRectsArea: 0,
  freeRectCount: 0,
  largestFreeRectArea: 0,
}

const hasSpacingConflict = (
  first: PlacedElement,
  second: PlacedElement,
  spacing: number,
): boolean => {
  const horizontalGap = Math.max(
    second.x - (first.x + first.width),
    first.x - (second.x + second.width),
    0,
  )
  const verticalGap = Math.max(
    second.y - (first.y + first.height),
    first.y - (second.y + second.height),
    0,
  )
  const overlapsY = first.y < second.y + second.height && second.y < first.y + first.height
  const overlapsX = first.x < second.x + second.width && second.x < first.x + first.width
  const insufficientHorizontalSpacing = overlapsY && horizontalGap + FLOAT_EPSILON < spacing
  const insufficientVerticalSpacing = overlapsX && verticalGap + FLOAT_EPSILON < spacing
  return insufficientHorizontalSpacing || insufficientVerticalSpacing
}

const validatePlacedLayout = (
  placed: PlacedElement[],
  board: Board,
  boardMargin: number,
  spacing: number,
): Set<string> => {
  const invalidIds = new Set<string>()

  for (const item of placed) {
    const insideBoard =
      item.x + FLOAT_EPSILON >= boardMargin &&
      item.y + FLOAT_EPSILON >= boardMargin &&
      item.x + item.width <= board.width - boardMargin + FLOAT_EPSILON &&
      item.y + item.height <= board.height - boardMargin + FLOAT_EPSILON

    if (!insideBoard) {
      invalidIds.add(item.instanceId)
    }
  }

  for (let i = 0; i < placed.length; i += 1) {
    for (let j = i + 1; j < placed.length; j += 1) {
      if (hasSpacingConflict(placed[i], placed[j], spacing)) {
        invalidIds.add(placed[i].instanceId)
        invalidIds.add(placed[j].instanceId)
      }
    }
  }

  return invalidIds
}

const buildResultFromPacker = (
  settings: ReturnType<typeof resolveCncCutSettings>,
  board: Board,
  usableWidth: number,
  usableHeight: number,
  boardMargin: number,
  spacing: number,
  singleBoardArea: number,
  expanded: ExpandedElement[],
  packer: MaxRectsPacker,
): PackResult => {
  const packedSet = new Set<string>()
  const grainBlockedUnplacedSet = new Set<string>()
  const smallRectThreshold = singleBoardArea * 0.05

  const boards: BoardLayout[] = packer.bins
    .map((bin, boardIndex) => {
      const placedWithValidation = bin.rects
        .map((rect) => {
          if (rect.oversized) {
            return null
          }

          const item = rect.data as ExpandedElement | undefined

          if (!item) {
            return null
          }

          packedSet.add(item.instanceId)

          if (rect.rot && !item.canRotate) {
            packedSet.delete(item.instanceId)
            grainBlockedUnplacedSet.add(item.instanceId)
            return null
          }

          const nominalWidth = rect.rot ? item.height : item.width
          const nominalHeight = rect.rot ? item.width : item.height
          const position = toBoardCoordinates(rect.x, rect.y, boardMargin)

          return {
            instanceId: item.instanceId,
            sourceId: item.sourceId,
            rowNumber: item.rowNumber,
            itemNumberInRow: item.itemNumberInRow,
            boardIndex,
            rotated: Boolean(rect.rot),
            x: position.x,
            y: position.y,
            width: nominalWidth,
            height: nominalHeight,
          }
        })
        .filter((item): item is PlacedElement => item !== null)

      const invalidPlacedIds = validatePlacedLayout(
        placedWithValidation,
        board,
        boardMargin,
        spacing,
      )
      const placed = placedWithValidation.filter((item) => !invalidPlacedIds.has(item.instanceId))
      for (const instanceId of invalidPlacedIds) {
        packedSet.delete(instanceId)
      }

      const freeRectAreas = bin.freeRects.map((rect) => rect.width * rect.height)
      const largestFreeRectArea = freeRectAreas.length > 0 ? Math.max(...freeRectAreas) : 0
      const smallRectsArea = freeRectAreas.reduce(
        (sum, area) => sum + (area < smallRectThreshold ? area : 0),
        0,
      )
      const freeRectCount = bin.freeRects.length
      const nominalUsedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0)
      const boardArea = singleBoardArea
      const usableArea = Math.max(0, usableWidth * usableHeight)
      const technicalUsedArea = placed.reduce(
        (sum, item) => sum + (item.width + spacing) * (item.height + spacing),
        0,
      )
      const usedArea = technicalUsedArea
      const wasteArea = Math.max(0, usableArea - technicalUsedArea)
      const wastePercentage = usableArea > 0 ? (wasteArea / usableArea) * 100 : 0

      return {
        boardIndex,
        placed,
        boardArea,
        usableArea,
        nominalUsedArea,
        technicalUsedArea,
        usedArea,
        wasteArea,
        wastePercentage,
        largestFreeRectArea,
        smallRectsArea,
        freeRectCount,
      }
    })
    .filter((boardLayout) => boardLayout.placed.length > 0)

  const placed: PlacedElement[] = boards.flatMap((boardLayout) => boardLayout.placed)
  const unplaced = expanded.filter((item) => !packedSet.has(item.instanceId))
  const boardCount = boards.length
  const boardArea = boardCount * singleBoardArea
  const usableArea = boardCount * Math.max(0, usableWidth * usableHeight)
  const nominalUsedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0)
  const technicalUsedArea = placed.reduce(
    (sum, item) => sum + (item.width + spacing) * (item.height + spacing),
    0,
  )
  const usedArea = technicalUsedArea
  const wasteArea = Math.max(0, usableArea - technicalUsedArea)
  const wastePercentage = usableArea > 0 ? (wasteArea / usableArea) * 100 : 0

  const totalSmallRectsArea = boards.reduce((sum, boardLayout) => sum + boardLayout.smallRectsArea, 0)
  const totalFreeRectCount = boards.reduce((sum, boardLayout) => sum + boardLayout.freeRectCount, 0)
  const largestFreeRectArea = boards.reduce(
    (maxArea, boardLayout) => Math.max(maxArea, boardLayout.largestFreeRectArea),
    0,
  )
  const score =
    boardCount * BOARD_COUNT_WEIGHT +
    wasteArea * WASTE_AREA_WEIGHT +
    totalSmallRectsArea * SMALL_RECTS_WEIGHT +
    totalFreeRectCount * FREE_RECTS_COUNT_WEIGHT -
    largestFreeRectArea * LARGEST_FREE_RECT_BONUS

  const qualityMetrics: QualityMetrics = {
    score,
    boardsCount: boardCount,
    smallRectsArea: totalSmallRectsArea,
    freeRectCount: totalFreeRectCount,
    largestFreeRectArea,
  }

  return {
    settings,
    usableWidth,
    usableHeight,
    boards,
    boardCount,
    placed,
    unplaced,
    boardArea,
    usableArea,
    nominalUsedArea,
    technicalUsedArea,
    usedArea,
    wasteArea,
    wastePercentage,
    qualityMetrics,
    grainBlockedUnplacedIds: Array.from(grainBlockedUnplacedSet),
  }
}

export const packBoard = (
  board: Board,
  elements: ElementInput[],
  cncSettings?: Partial<CncCutSettings>,
): PackResult => {
  const settings = resolveCncCutSettings(cncSettings)
  const { usableWidth, usableHeight } = getUsableBoard(board, settings)
  const singleBoardArea = Math.max(0, board.width * board.height)

  if (
    !isPositive(board.width) ||
    !isPositive(board.height) ||
    !isPositive(usableWidth) ||
    !isPositive(usableHeight)
  ) {
    return {
      settings,
      usableWidth,
      usableHeight,
      boards: [],
      boardCount: 0,
      placed: [],
      unplaced: [],
      boardArea: singleBoardArea,
      usableArea: Math.max(0, usableWidth * usableHeight),
      nominalUsedArea: 0,
      technicalUsedArea: 0,
      usedArea: 0,
      wasteArea: Math.max(0, usableWidth * usableHeight),
      wastePercentage: 100,
      qualityMetrics: emptyQualityMetrics,
      grainBlockedUnplacedIds: [],
    }
  }

  const expanded = expandElements(board, elements).filter(
    (item) => isPositive(item.width) && isPositive(item.height),
  )

  if (expanded.length === 0) {
    return {
      settings,
      usableWidth,
      usableHeight,
      boards: [],
      boardCount: 0,
      placed: [],
      unplaced: [],
      boardArea: 0,
      usableArea: 0,
      nominalUsedArea: 0,
      technicalUsedArea: 0,
      usedArea: 0,
      wasteArea: 0,
      wastePercentage: 0,
      qualityMetrics: emptyQualityMetrics,
      grainBlockedUnplacedIds: [],
    }
  }

  const sortStrategies: SortStrategy[] = ['area', 'longest-edge', 'shortest-edge', 'ratio']
  const logicStrategies: PACKING_LOGIC[] = [PACKING_LOGIC.MAX_EDGE, PACKING_LOGIC.MAX_AREA]
  const results: PackResult[] = []

  for (const sortStrategy of sortStrategies) {
    for (const logic of logicStrategies) {
      const sorted = sortExpanded(expanded, sortStrategy)
      const packer = new MaxRectsPacker(usableWidth, usableHeight, 0, {
        smart: false,
        pot: false,
        square: false,
        allowRotation: true,
        logic,
      })
      for (const item of sorted) {
        const inflated = inflateSizeForKerf(item, settings.spacing)
        const rectangle = new Rectangle(
          inflated.width,
          inflated.height,
          0,
          0,
          false,
          item.canRotate,
        )
        rectangle.data = item
        packer.add(rectangle)
      }
      results.push(
        buildResultFromPacker(
          settings,
          board,
          usableWidth,
          usableHeight,
          settings.boardMargin,
          settings.spacing,
          singleBoardArea,
          expanded,
          packer,
        ),
      )
    }
  }

  return results.reduce((best, current) => {
    if (current.qualityMetrics.score < best.qualityMetrics.score) {
      return current
    }
    if (current.qualityMetrics.score > best.qualityMetrics.score) {
      return best
    }
    if (current.boardCount < best.boardCount) {
      return current
    }
    if (current.boardCount > best.boardCount) {
      return best
    }
    return current.wasteArea < best.wasteArea ? current : best
  })
}
