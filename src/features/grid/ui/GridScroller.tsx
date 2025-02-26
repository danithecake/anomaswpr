import clsx from 'clsx'
import { useGridScroll } from '@entities'
import { Button } from '@shared'

export const GridScroller: FC = () => {
  const scroll = useGridScroll()

  return (
    <>
      <div
        className={clsx(
          scroll.position.col === 0 && 'hidden',
          'absolute top-0 left-2 h-full flex items-center'
        )}
      >
        <Button
          label="←"
          vertical
          onMouseDown={scroll.left}
          onMouseUp={scroll.stop}
        />
      </div>
      <div
        className={clsx(
          scroll.position.row === 0 && 'hidden',
          'absolute top-2 left-0 w-full flex justify-center'
        )}
      >
        <Button label="↑" onMouseDown={scroll.top} onMouseUp={scroll.stop} />
      </div>
      <div
        className={clsx(
          scroll.position.row === scroll.limit.row && 'hidden',
          'absolute bottom-5 left-0 w-full flex justify-center'
        )}
      >
        <Button label="↓" onMouseDown={scroll.bottom} onMouseUp={scroll.stop} />
      </div>
      <div
        className={clsx(
          scroll.position.col === scroll.limit.col && 'hidden',
          'group absolute top-0 right-5 h-full flex items-center'
        )}
      >
        <Button
          label="→"
          vertical
          onMouseDown={scroll.right}
          onMouseUp={scroll.stop}
        />
      </div>
    </>
  )
}
