export const rowPalette = [
  '#ef4444',
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#a855f7',
  '#14b8a6',
  '#ec4899',
  '#84cc16',
]

export const getRowColor = (rowNumber: number) =>
  rowPalette[(Math.max(1, rowNumber) - 1) % rowPalette.length]
