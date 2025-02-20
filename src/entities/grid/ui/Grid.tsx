import clsx from 'clsx'
import { CSSProperties } from 'react'
import { CELL_VIEWPORT, GRID_VIEWPORT } from '../constants'
import { useGrid } from '../hooks'
import { Cell } from './Cell'
import cssModule from './Grid.module.css'

export const Grid: FC = () => {
  const grid = useGrid()

  return (
    <div
      className="relative min-w-max min-h-max"
      style={{
        margin: GRID_VIEWPORT.gap.outter,
      }}
    >
      <div
        className="relative z-10 border rounded-lg overflow-hidden bg-white box-border"
        style={
          {
            '--cell-size': `${grid.bounds.cell}px`,
            '--cell-margin': `${CELL_VIEWPORT.gap.outter}px`,
            '--cell-padding': `${CELL_VIEWPORT.gap.inner}px`,
            '--cell-border-width': `${CELL_VIEWPORT.border}px`,
            width: grid.bounds.width.visible,
            height: grid.bounds.height.visible,
            padding: GRID_VIEWPORT.gap.inner,
            borderWidth: GRID_VIEWPORT.border,
          } as CSSProperties
        }
      >
        <div
          className="w-full h-full flex flex-wrap box-border"
          style={{
            width: grid.bounds.width.full,
            height: grid.bounds.height.full,
          }}
        >
          {grid.cells.map((cell) => (
            <Cell key={`cell-${cell.id}`} cell={cell} />
          ))}
        </div>
      </div>
      <div className={clsx(cssModule.floatedUnderlayer, 'border rounded-lg')} />
    </div>
  )
}
