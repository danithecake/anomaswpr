import { useUnit } from 'effector-react'
import { RefObject, useEffect, useRef } from 'react'
import { attachViewportContainerEvent } from '../model'
import { TViewport } from '../types'

export const useViewportContainer: () => RefObject<
  TViewport['container']
> = () => {
  const container = useRef<TViewport['container']>(null)
  const attach = useUnit(attachViewportContainerEvent)

  useEffect(() => {
    attach(container.current)
  }, [container, attach])

  return container
}
