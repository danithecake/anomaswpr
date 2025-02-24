import clsx from 'clsx'
import { useUnit } from 'effector-react'
import { CSSProperties, useCallback, useEffect } from 'react'
import { useWindowResize } from '@shared'
import { CELL_BOX, GRID_BOX } from '../constants'
import { useViewportContainer } from '../hooks'
import { $grid, $viewport, calcViewportFx, initGridFx } from '../model'
import { Cell } from './Cell'

export const Grid: FC = () => {
  const grid = useUnit($grid)
  const viewport = useUnit($viewport)
  const container = useViewportContainer()
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
  useEffect(() => {
    container.current?.scrollTo(0, 0)
  }, [container, viewport])

  return (
    <div
      className="relative min-w-max min-h-max"
      style={
        {
          '--isometric-float-min': '6px',
          '--isometric-float-max': '10px',
          '--grid-padding': `${GRID_BOX.gap.inner}px`,
          '--grid-border-width': `${GRID_BOX.border}px`,
          '--viewport-width': `${viewport.width}px`,
          '--viewport-height': `${viewport.height}px`,
          '--cell-size': `${viewport.cell}px`,
          '--cell-margin': `${CELL_BOX.gap.outter}px`,
          '--cell-padding': `${CELL_BOX.gap.inner}px`,
          '--cell-border-width': `${CELL_BOX.border}px`,
          margin: GRID_BOX.gap.outter,
        } as CSSProperties
      }
    >
      <div
        className={clsx(
          'relative z-10',
          'min-w-max min-h-max overflow-hidden',
          'border-[length:var(--grid-border-width)] rounded-lg'
        )}
      >
        <div className="absolute z-10 top-0 h-[var(--grid-padding)] w-full bg-primary" />
        <div className="absolute z-10 right-0 h-full w-[var(--grid-padding)] bg-primary" />
        <div className="absolute z-10 bottom-0 h-[var(--grid-padding)] w-full bg-primary" />
        <div className="absolute z-10 left-0 h-full w-[var(--grid-padding)] bg-primary" />
        <div
          id="grid-viewport"
          ref={container}
          className={clsx(
            'z-0',
            'w-[var(--viewport-width)] h-[var(--viewport-height)] overflow-hidden',
            'flex flex-col justify-start',
            'p-[calc(var(--grid-padding)+var(--grid-border-width))]',
            'bg-primary box-border rounded-lg'
          )}
        >
          {grid.map((cells, row) => (
            <div key={`row-${row}`} className="flex min-h-min">
              {cells.map((cell) => (
                <Cell key={`cell-${cell.id}`} cell={cell} />
              ))}
              <div className="size-[var(--cell-size)] shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 border rounded-lg animate-isometric-float" />
    </div>
  )
}
