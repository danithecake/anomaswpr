import { useCallback, useEffect, useState } from 'react'
import { useWindowResize } from '@shared'
import { GRID_SIZE } from '../constants'
import { calcGridBounds } from '../helpers'
import { TGrid } from '../types'

export const useGrid = (): TGrid => {
  const [bounds, setBounds] = useState<TGrid['bounds']>(calcGridBounds())
  const [cells, setCells] = useState<TGrid['cells']>([])

  const handleWindowResize = useCallback(() => {
    setBounds(calcGridBounds())
  }, [])

  useWindowResize(handleWindowResize)

  useEffect(() => {
    setCells(
      [...new Array(GRID_SIZE.cols * GRID_SIZE.rows)].map((_, idx) => ({
        id: idx,
        position: {
          col: idx % GRID_SIZE.cols,
          row: idx % GRID_SIZE.rows,
        },
      }))
    )
  }, [])

  return {
    bounds,
    cells,
  }
}
