import { createEffect, createStore } from 'effector'
import { GRID_SIZE } from '../constants'
import { TCell, TGrid } from '../types'

export const initFx = createEffect<void, TGrid, Error>(() => (
  [...(new Array(GRID_SIZE.rows) as undefined[])].map((_, row) => (
    [...(new Array(GRID_SIZE.cols)) as undefined[]].map((_, col) => {
      const cell = {
        position: { col, row },
      } as TCell

      cell.id = `${row}:${col}`

      return cell
    })
  ))
))

export const $grid = createStore<TGrid>([])
  .on(initFx.doneData, (_, payload) => payload)
