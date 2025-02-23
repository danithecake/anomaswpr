export const CELL_SIZE = {
  min: 24,
  max: 32,
} as const // px

export const CELL_BOX = {
  gap: {
    outter: 2,
    inner: 1,
  },
  border: 1,
} as const // px

export const GRID_SIZE = {
  rows: 15,
  cols: 30,
} as const

export const GRID_BOX = {
  gap: {
    outter: 16,
    inner: 2,
  },
  border: 1,
} as const // px