import clsx from 'clsx'
import { MouseEventHandler, useCallback, useState } from 'react'
import { isFunction } from '../../guards'
import { TButtonBaseProps } from './types'

export const ButtonBase: FC<TButtonBaseProps> = ({
  label,
  icon,
  className,
  onClick,
  onMouseDown,
  onMouseUp,
}) => {
  const [isActive, setActiveState] = useState<boolean>(false)

  const handlePointerDown = useCallback<MouseEventHandler>(
    (event) => {
      setActiveState(true)

      if (isFunction(onMouseDown)) {
        onMouseDown(event)
      }
    },
    [onMouseDown, setActiveState]
  )
  const handlePointerUp = useCallback<MouseEventHandler>(
    (event) => {
      setActiveState(false)

      if (isFunction(onMouseUp)) {
        onMouseUp(event)
      }
    },
    [onMouseUp, setActiveState]
  )
  const handleContextMenu = useCallback<MouseEventHandler>((event) => {
    event.preventDefault()
  }, [])

  return (
    <button
      className={clsx(
        'relative max-w-fit group/button cursor-pointer',
        isActive && 'active',
        className?.container
      )}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onContextMenu={handleContextMenu}
    >
      <span
        className={clsx(
          'relative size-full z-10 block',
          'p-2 border rounded-lg',
          'flex justify-center items-center',
          'bg-primary text-primary select-none pointer-events-none',
          'transition-transform',
          className?.content
        )}
      >
        {icon?.left && icon.left}
        {label && label}
        {icon?.center && icon.center}
        {icon?.right && icon.right}
      </span>
      <span
        className={clsx(
          'absolute z-0 inset-0',
          'block p-1 border rounded-lg',
          'animate-isometric-float',
          className?.underlayer
        )}
      />
    </button>
  )
}
