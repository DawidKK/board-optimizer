export type Board = {
  width: number
  height: number
}

export type ElementInput = {
  id: string
  width: number
  height: number
  quantity: number
}

export type ExpandedElement = {
  instanceId: string
  sourceId: string
  rowNumber: number
  itemNumberInRow: number
  width: number
  height: number
}

export type PlacedElement = {
  instanceId: string
  sourceId: string
  rowNumber: number
  itemNumberInRow: number
  boardIndex: number
  rotated: boolean
  x: number
  y: number
  width: number
  height: number
}

export type BoardLayout = {
  boardIndex: number
  placed: PlacedElement[]
  boardArea: number
  usedArea: number
  wasteArea: number
  wastePercentage: number
}

export type PackResult = {
  boards: BoardLayout[]
  boardCount: number
  placed: PlacedElement[]
  unplaced: ExpandedElement[]
  boardArea: number
  usedArea: number
  wasteArea: number
  wastePercentage: number
}
