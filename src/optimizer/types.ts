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
  rotated: boolean
  x: number
  y: number
  width: number
  height: number
}

export type PackResult = {
  placed: PlacedElement[]
  unplaced: ExpandedElement[]
  boardArea: number
  usedArea: number
  wasteArea: number
  wastePercentage: number
}
