import { MouseEventHandler, useCallback } from 'react'
import { GridScroller } from '@features'
import { Grid } from '@entities'

export const PlayArea: FC = () => {
  const handleContextMenu = useCallback<MouseEventHandler>((evt) => {
    evt.preventDefault()
  }, [])

  return (
    <div className="relative flex" onContextMenu={handleContextMenu}>
      <div className="relative z-0 w-full h-full">
        <Grid />
      </div>
      <GridScroller />
    </div>
  )
}
