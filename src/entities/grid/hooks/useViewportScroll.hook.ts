import { useUnit } from 'effector-react'
import { $scroll, scrollApi } from '../model'
import { TScroll } from '../types'

export const useViewportScroll: () => TScroll & {
  left: () => void
  right: () => void
  top: () => void
  bottom: () => void
  stop: () => void
} = () => {
  const { position, limit } = useUnit($scroll)
  const { left, right, top, bottom, stop } = useUnit(scrollApi)

  return {
    position,
    limit,
    left,
    right,
    top,
    bottom,
    stop,
  }
}
