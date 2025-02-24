import { DeferredPromise } from '@shared'
import { GRID_SCROLL_INCREMENT } from '../constants'
import { TViewport } from '../types'

type TViewportScroller = {
  scroll: (options: ScrollToOptions) => Promise<void>
  increment: number
}

export async function* generateViewportScrollers(
  container: NonNullable<TViewport['container']>
) {
  const scroll: TViewportScroller['scroll'] = (options) => {
    const deferred = new DeferredPromise<void>()
    const position = {
      left: container.scrollLeft,
      top: container.scrollTop,
    }
    const onScroll = (): void => {
      if (
        (position.left !== container.scrollLeft &&
          container.scrollLeft === options.left) ||
        (position.top !== container.scrollTop &&
          container.scrollTop === options.top)
      ) {
        deferred.resolve()

        return
      }

      position.left = container.scrollLeft
      position.top = container.scrollTop
    }

    onScroll()

    void deferred.promise.finally(() =>
      container.removeEventListener('scroll', onScroll)
    )

    container.addEventListener('scroll', onScroll)
    container.scrollTo(options)

    return deferred.promise
  }

  yield {
    scroll,
    increment: GRID_SCROLL_INCREMENT.base,
  } as TViewportScroller

  while (true) {
    yield {
      scroll,
      increment: GRID_SCROLL_INCREMENT.medium,
    } as TViewportScroller
    await Promise.resolve()
  }
}
