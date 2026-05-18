import type { Board, CncCutSettings, ResolvedCncCutSettings } from './types'

export const DEFAULT_CNC_CUT_SETTINGS: CncCutSettings = {
  toolDiameter: 6,
  safetySpacing: 1,
  boardMargin: 10,
}

const isFiniteNonNegative = (value: number) => Number.isFinite(value) && value >= 0
const isFinitePositive = (value: number) => Number.isFinite(value) && value > 0

// Kerf is the material removed by the cutter. We model it as a required spacing
// between neighboring parts so the tool can physically pass between contours.
export const resolveCncCutSettings = (
  input?: Partial<CncCutSettings>,
): ResolvedCncCutSettings => {
  const toolDiameter = isFinitePositive(input?.toolDiameter ?? Number.NaN)
    ? (input?.toolDiameter as number)
    : DEFAULT_CNC_CUT_SETTINGS.toolDiameter
  const safetySpacing = isFiniteNonNegative(input?.safetySpacing ?? Number.NaN)
    ? (input?.safetySpacing as number)
    : DEFAULT_CNC_CUT_SETTINGS.safetySpacing
  const boardMargin = isFiniteNonNegative(input?.boardMargin ?? Number.NaN)
    ? (input?.boardMargin as number)
    : DEFAULT_CNC_CUT_SETTINGS.boardMargin

  return {
    toolDiameter,
    safetySpacing,
    boardMargin,
    spacing: toolDiameter + safetySpacing,
  }
}

export const getUsableBoard = (board: Board, settings: ResolvedCncCutSettings) => ({
  usableWidth: board.width - settings.boardMargin * 2,
  usableHeight: board.height - settings.boardMargin * 2,
})

type Size = { width: number; height: number }

// Inflating parts by spacing ensures horizontal/vertical separation naturally
// falls out of the nesting solver without custom collision math in each step.
export const inflateSizeForKerf = (size: Size, spacing: number): Size => ({
  width: size.width + spacing,
  height: size.height + spacing,
})

export const toBoardCoordinates = (
  x: number,
  y: number,
  boardMargin: number,
): { x: number; y: number } => ({
  x: x + boardMargin,
  y: y + boardMargin,
})
