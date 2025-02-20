import {
  CELL_SIZE,
  CELL_VIEWPORT,
  GRID_SIZE,
  GRID_VIEWPORT,
} from '../constants'
import { TGridBounds } from '../types'

export const calcGridBounds = (): TGridBounds => {
  const viewport = document.body.getBoundingClientRect()
  const grid: TGridBounds = {
    cell: CELL_SIZE.min,
    gutter: {
      inner: GRID_VIEWPORT.gap.inner * 2 + GRID_VIEWPORT.border * 2,
      outter: GRID_VIEWPORT.gap.outter * 2,
      full: 0,
    },
    width: {
      full: 0,
      visible: 0,
    },
    height: {
      full: 0,
      visible: 0,
    },
  }

  grid.gutter.full = grid.gutter.inner + grid.gutter.outter
  grid.width.full = viewport.width - grid.gutter.full
  grid.height.full = viewport.height - grid.gutter.full

  const isLandscapeView = grid.width.full > grid.height.full

  grid.cell = Math.max(
    CELL_SIZE.min,
    Math.min(
      CELL_SIZE.max,
      Math.ceil(
        isLandscapeView
          ? grid.width.full / GRID_SIZE.cols
          : grid.height.full / GRID_SIZE.rows
      ) +
        CELL_VIEWPORT.border * 2 +
        CELL_VIEWPORT.gap.outter * 2
    )
  )

  const cols = Math.floor(grid.width.full / grid.cell)
  const rows = Math.floor(grid.height.full / grid.cell)

  grid.width.visible =
    grid.cell * (cols > GRID_SIZE.cols ? GRID_SIZE.cols : cols) +
    grid.gutter.inner
  grid.height.visible =
    grid.cell * (rows > GRID_SIZE.rows ? GRID_SIZE.rows : rows) +
    grid.gutter.inner * 2
  grid.width.full = grid.cell * GRID_SIZE.cols + grid.gutter.inner
  grid.height.full = grid.cell * GRID_SIZE.rows + grid.gutter.inner

  return grid
}
