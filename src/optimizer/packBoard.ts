import { MaxRectsPacker } from 'maxrects-packer'
import type {
  Board,
  ElementInput,
  ExpandedElement,
  PackResult,
  PlacedElement,
} from './types'

const isPositive = (value: number) => Number.isFinite(value) && value > 0

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

export const packBoard = (board: Board, elements: ElementInput[]): PackResult => {
  const boardArea = Math.max(0, board.width * board.height)

  if (!isPositive(board.width) || !isPositive(board.height)) {
    return {
      placed: [],
      unplaced: [],
      boardArea,
      usedArea: 0,
      wasteArea: boardArea,
      wastePercentage: 100,
    }
  }

  const expanded = expandElements(elements).filter(
    (item) => isPositive(item.width) && isPositive(item.height),
  )

  const packer = new MaxRectsPacker(board.width, board.height, 0, {
    smart: false,
    pot: false,
    square: false,
    allowRotation: true,
  })

  for (const item of expanded) {
    packer.add(item.width, item.height, item)
  }

  const packedRects = packer.bins[0]?.rects ?? []
  const packedSet = new Set<string>()

  const placed: PlacedElement[] = packedRects
    .map((rect) => {
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
        rotated: Boolean(rect.rot),
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      }
    })
    .filter((item): item is PlacedElement => item !== null)

  const unplaced = expanded.filter((item) => !packedSet.has(item.instanceId))
  const usedArea = placed.reduce((sum, item) => sum + item.width * item.height, 0)
  const wasteArea = Math.max(0, boardArea - usedArea)
  const wastePercentage = boardArea > 0 ? (wasteArea / boardArea) * 100 : 0

  return {
    placed,
    unplaced,
    boardArea,
    usedArea,
    wasteArea,
    wastePercentage,
  }
}
