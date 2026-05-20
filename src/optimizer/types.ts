export const GRAIN_AXIS_WIDTH = 'Szerokość (wzdłuż płyty)' as const
export const GRAIN_AXIS_HEIGHT = 'Wysokość (wzdłuż płyty)' as const

export type Board = {
  width: number
  height: number
  grainDirectionEnabled: boolean
  grainAxis: typeof GRAIN_AXIS_WIDTH | typeof GRAIN_AXIS_HEIGHT
}

export type CncCutSettings = {
  toolDiameter: number
  safetySpacing: number
  boardMargin: number
}

export type ResolvedCncCutSettings = CncCutSettings & {
  spacing: number
}

export type ElementInput = {
  id: string
  width: number
  height: number
  quantity: number
  canRotate?: boolean
}

export type ExpandedElement = {
  instanceId: string
  sourceId: string
  rowNumber: number
  itemNumberInRow: number
  width: number
  height: number
  canRotate: boolean
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
  usableArea: number
  nominalUsedArea: number
  technicalUsedArea: number
  usedArea: number
  wasteArea: number
  wastePercentage: number
  largestFreeRectArea: number
  smallRectsArea: number
  freeRectCount: number
}

export type QualityMetrics = {
  score: number
  boardsCount: number
  smallRectsArea: number
  freeRectCount: number
  largestFreeRectArea: number
}

export type PackResult = {
  settings: ResolvedCncCutSettings
  usableWidth: number
  usableHeight: number
  boards: BoardLayout[]
  boardCount: number
  placed: PlacedElement[]
  unplaced: ExpandedElement[]
  boardArea: number
  usableArea: number
  nominalUsedArea: number
  technicalUsedArea: number
  usedArea: number
  wasteArea: number
  wastePercentage: number
  qualityMetrics: QualityMetrics
  grainBlockedUnplacedIds: string[]
}
