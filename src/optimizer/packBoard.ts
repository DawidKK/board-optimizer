import { MaxRectsPacker, PACKING_LOGIC } from 'maxrects-packer'
import type {
  Board,
  BoardLayout,
  ElementInput,
  ExpandedElement,
  PackResult,
  PlacedElement,
  QualityMetrics,
} from './types'

const isPositive = (value: number) => Number.isFinite(value) && value > 0
const BOARD_COUNT_WEIGHT = 1_000_000
const WASTE_AREA_WEIGHT = 1
const SMALL_RECTS_WEIGHT = 2
const FREE_RECTS_COUNT_WEIGHT = 5_000
const LARGEST_FREE_RECT_BONUS = 0.6

export const expandElements = (elements: ElementInput[]): ExpandedElement[] =>
  elements.flatMap((element, rowIndex) => {
    const quantity = Math.max(0, Math.floor(element.quantity || 0))

    return Array.from({ length: quantity }, (_, index) => ({
      instanceId: `${element.id}-${index + 1}`,
      sourceId: element.id,
      rowNumber: rowIndex + 1,
      itemNumberInRow: index + 1,
      width: element.width,
      height: element.height,
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

const buildResultFromPacker = (
  singleBoardArea: number,
  expanded: ExpandedElement[],
  packer: MaxRectsPacker,
): PackResult => {
  const packedSet = new Set<string>()
  const smallRectThreshold = singleBoardArea * 0.05

  const boards: BoardLayout[] = packer.bins
    .map((bin, boardIndex) => {
      const placed = bin.rects
        .map((rect) => {
          if (rect.oversized) {
            return null
          }

          const item = rect.data as ExpandedElement | undefined

          if (!item) {
            return null
          }

          packedSet.add(item.instanceId)

          return {
            instanceId: item.instanceId,
            sourceId: item.sourceId,
            rowNumber: item.rowNumber,
            itemNumberInRow: item.itemNumberInRow,
            boardIndex,
            rotated: Boolean(rect.rot),
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          }
        })
        .filter((item): item is PlacedElement => item !== null)

      const freeRectAreas = bin.freeRects.map((rect) => rect.width * rect.height)
      const largestFreeRectArea = freeRectAreas.length > 0 ? Math.max(...freeRectAreas) : 0
      const smallRectsArea = freeRectAreas.reduce(
        (sum, area) => sum + (area < smallRectThreshold ? area : 0),
        0,
      )
      const freeRectCount = bin.freeRects.length
      const usedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0)
      const boardArea = singleBoardArea
      const wasteArea = Math.max(0, boardArea - usedArea)
      const wastePercentage = boardArea > 0 ? (wasteArea / boardArea) * 100 : 0

      return {
        boardIndex,
        placed,
        boardArea,
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
  const usedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0)
  const wasteArea = Math.max(0, boardArea - usedArea)
  const wastePercentage = boardArea > 0 ? (wasteArea / boardArea) * 100 : 0

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
    boards,
    boardCount,
    placed,
    unplaced,
    boardArea,
    usedArea,
    wasteArea,
    wastePercentage,
    qualityMetrics,
  }
}

export const packBoard = (board: Board, elements: ElementInput[]): PackResult => {
  const singleBoardArea = Math.max(0, board.width * board.height)

  if (!isPositive(board.width) || !isPositive(board.height)) {
    return {
      boards: [],
      boardCount: 0,
      placed: [],
      unplaced: [],
      boardArea: singleBoardArea,
      usedArea: 0,
      wasteArea: singleBoardArea,
      wastePercentage: 100,
      qualityMetrics: emptyQualityMetrics,
    }
  }

  const expanded = expandElements(elements).filter(
    (item) => isPositive(item.width) && isPositive(item.height),
  )

  if (expanded.length === 0) {
    return {
      boards: [],
      boardCount: 0,
      placed: [],
      unplaced: [],
      boardArea: 0,
      usedArea: 0,
      wasteArea: 0,
      wastePercentage: 0,
      qualityMetrics: emptyQualityMetrics,
    }
  }

  const sortStrategies: SortStrategy[] = ['area', 'longest-edge', 'shortest-edge', 'ratio']
  const logicStrategies: PACKING_LOGIC[] = [PACKING_LOGIC.MAX_EDGE, PACKING_LOGIC.MAX_AREA]
  const results: PackResult[] = []

  for (const sortStrategy of sortStrategies) {
    for (const logic of logicStrategies) {
      const packer = new MaxRectsPacker(board.width, board.height, 0, {
        smart: false,
        pot: false,
        square: false,
        allowRotation: true,
        logic,
      })
      const sorted = sortExpanded(expanded, sortStrategy)
      for (const item of sorted) {
        packer.add(item.width, item.height, item)
      }
      results.push(buildResultFromPacker(singleBoardArea, expanded, packer))
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
