import { GRID_SCROLL_INCREMENT } from '../constants'
import { TViewport } from '../types'

type TViewportScroller = {
  end: Promise<void>
  increment: number
}

export async function* generateViewportScrollers(
  container: NonNullable<TViewport['container']>
) {
  const executor: ConstructorParameters<typeof Promise<void>>[0] = (
    resolve
  ) => {
    const onScrollEnd = (): void => {
      resolve()
      container.removeEventListener('scrollend', onScrollEnd)
    }

    container.addEventListener('scrollend', onScrollEnd)
  }

  yield {
    end: new Promise<void>(executor),
    increment: GRID_SCROLL_INCREMENT.base,
  } as TViewportScroller

  while (true) {
    yield {
      end: new Promise<void>(executor),
      increment: GRID_SCROLL_INCREMENT.medium,
    } as TViewportScroller
    await Promise.resolve()
  }
}
