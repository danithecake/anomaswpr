import { createEffect, createStore } from 'effector'
import { CELL_SIZE, CELL_BOX, GRID_SIZE, GRID_BOX } from '../constants'
import { TViewport } from '../types'

export const calcViewportFx = createEffect<DOMRect, TViewport, Error>((bounds) => {
  const gutter = {
    inner: (GRID_BOX.border + GRID_BOX.gap.inner) * 2,
    outter: GRID_BOX.gap.outter * 2,
  } as {
    inner: number
    outter: number
    full: number
  } // px

  gutter.full = gutter.inner + gutter.outter

  const viewport = {
    width: bounds.width - gutter.full,
    height: bounds.height - gutter.full,
  } as TViewport

  const isLandscapeView = viewport.width > viewport.height
  const cell = {
    gutter: (CELL_BOX.border + CELL_BOX.gap.outter) * 2, 
  } as {
    gutter: number
    size: number
  } // px

  cell.size = Math.max(
      CELL_SIZE.min,
      Math.min(
        CELL_SIZE.max,
        Math.ceil(
          isLandscapeView
            ? viewport.width / GRID_SIZE.cols
            : viewport.height / GRID_SIZE.rows
        ) + cell.gutter
      )
    )
  viewport.cols = Math.min(Math.floor(viewport.width / cell.size), GRID_SIZE.cols)
  viewport.rows = Math.min(Math.floor(viewport.height / cell.size), GRID_SIZE.rows)
  viewport.width = viewport.cols * cell.size + gutter.inner
  viewport.height = viewport.rows * cell.size + gutter.inner
  viewport.cell = cell.size

  return viewport
})

export const $viewport = createStore<TViewport>({
  cols: GRID_SIZE.cols,
  rows: GRID_SIZE.rows,
  width: 0,
  height: 0,
  cell: 0,
}).on(calcViewportFx.doneData, (_, payload) => payload)