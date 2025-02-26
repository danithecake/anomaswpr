import { useUnit } from 'effector-react'
import { CSSProperties, useCallback, useEffect } from 'react'
import { useWindowResize } from '@shared'
import { CELL_BOX, GRID_BOX } from '../constants'
import { $viewport, $grid, calcViewportFx, initGridFx } from '../model'
import { Cell } from './Cell'

export const Grid: FC = () => {
  const viewport = useUnit($viewport)
  const grid = useUnit($grid)
  const calcViewport = useUnit(calcViewportFx)
  const initGrid = useUnit(initGridFx)

  const handleWindowResize = useCallback(() => {
    void calcViewport(document.body.getBoundingClientRect())
  }, [calcViewport])

  useWindowResize(handleWindowResize)
  useEffect(() => {
    handleWindowResize()
  }, [handleWindowResize])
  useEffect(() => {
    void initGrid()
  }, [initGrid])

  return (
    <div
      className="relative min-w-max min-h-max"
      style={
        {
          '--isometric-float-min': '6px',
          '--isometric-float-max': '10px',
          margin: GRID_BOX.gap.outter,
        } as CSSProperties
      }
    >
      <div
        className="relative z-10 border rounded-lg overflow-hidden bg-white box-border flex flex-col"
        style={
          {
            '--cell-size': `${viewport.cell}px`,
            '--cell-margin': `${CELL_BOX.gap.outter}px`,
            '--cell-padding': `${CELL_BOX.gap.inner}px`,
            '--cell-border-width': `${CELL_BOX.border}px`,
            width: viewport.width,
            height: viewport.height,
            padding: GRID_BOX.gap.inner,
            borderWidth: GRID_BOX.border,
          } as CSSProperties
        }
      >
        {grid.map((cells, row) => (
          <div key={`row-${row}`} className="flex min-h-min">
            {cells.map((cell) => (
              <Cell key={`cell-${cell.id}`} cell={cell} />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 border rounded-lg animate-isometric-float" />
    </div>
  )
}
