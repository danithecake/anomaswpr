import { Event, createEffect, createEvent, createStore, sample } from 'effector'
import { CELL_SIZE, CELL_BOX, GRID_SIZE, GRID_BOX } from '../constants'
import { generateViewportScrollers } from '../helpers'
import { TScroll, TViewport } from '../types'

export const attachViewportContainerEvent =
  createEvent<TViewport['container']>()

export const calcViewportFx = createEffect<DOMRect, TViewport, Error>(
  (bounds) => {
    const gutter = {
      inner: (GRID_BOX.border + GRID_BOX.gap.inner) * 2,
      outter: GRID_BOX.gap.outter * 2,
    } as {
      inner: number
      outter: number
      full: number
    } // px

    gutter.full = gutter.inner + gutter.outter

    const viewport = {
      container: null,
      width: bounds.width - gutter.full,
      height: bounds.height - gutter.full,
    } as TViewport

    const isLandscapeView = viewport.width > viewport.height
    const cell = {
      gutter: (CELL_BOX.border + CELL_BOX.gap.outter) * 2,
    } as {
      gutter: number
      size: number
    } // px

    cell.size = Math.max(
      CELL_SIZE.min,
      Math.min(
        CELL_SIZE.max,
        Math.ceil(
          isLandscapeView
            ? viewport.width / GRID_SIZE.cols
            : viewport.height / GRID_SIZE.rows
        ) + cell.gutter
      )
    )
    viewport.cols = Math.min(
      Math.floor(viewport.width / cell.size),
      GRID_SIZE.cols
    )
    viewport.rows = Math.min(
      Math.floor(viewport.height / cell.size),
      GRID_SIZE.rows
    )
    viewport.width = viewport.cols * cell.size + gutter.inner
    viewport.height = viewport.rows * cell.size + gutter.inner
    viewport.cell = cell.size

    return viewport
  }
)

export const $viewport = createStore<TViewport>({
  container: null,
  cols: GRID_SIZE.cols,
  rows: GRID_SIZE.rows,
  width: 0,
  height: 0,
  cell: 0,
})
  .on(calcViewportFx.doneData, (source, payload) => ({
    ...payload,
    container: source.container,
  }))
  .on(attachViewportContainerEvent, (source, payload) => ({
    ...source,
    container: payload,
  }))

type TScrollFxPayload = {
  aborter: AbortController
  container: NonNullable<TViewport['container']>
  cell: TViewport['cell']
  position: TScroll['position']
  limit: TScroll['limit']
  unit: keyof TScroll['position']
  reversed?: boolean
}

const scrollFx = createEffect<TScrollFxPayload, TScroll['position'], void>(
  async ({
    aborter,
    container,
    cell,
    position,
    limit,
    unit,
    reversed = false,
  }) => {
    for await (const scroller of generateViewportScrollers(container)) {
      if (aborter.signal.aborted) {
        break
      }

      position[unit] = Math.max(
        0,
        Math.min(
          limit[unit],
          position[unit] + scroller.increment * (reversed ? -1 : 1)
        )
      )

      await scroller.scroll({
        left: position.col * cell,
        top: position.row * cell,
        behavior: 'smooth',
      })

      if (position[unit] === 0 || position[unit] === limit[unit]) {
        break
      }
    }

    return position
  }
)

const stopScrollFx = createEffect<AbortController, void, Error>((aborter) =>
  aborter.abort()
)

export const $scroll = createStore<TScroll>({
  position: {
    col: 0,
    row: 0,
  },
  limit: {
    col: GRID_SIZE.cols,
    row: GRID_SIZE.rows,
  },
})
  .on($viewport.updates, (_, payload) => ({
    position: {
      col: 0,
      row: 0,
    },
    limit: {
      col: GRID_SIZE.cols - payload.cols,
      row: GRID_SIZE.rows - payload.rows,
    },
  }))
  .on(scrollFx.doneData, (source, payload) => ({
    limit: source.limit,
    position: payload,
  }))

export const scrollApi = {
  left: createEvent(),
  right: createEvent(),
  top: createEvent(),
  bottom: createEvent(),
  stop: createEvent(),
}

sample({
  source: {
    viewport: $viewport,
    scroll: $scroll,
  },
  clock: [
    scrollApi.left.map(() => ({
      unit: 'col',
      reversed: true,
    })),
    scrollApi.right.map(() => ({
      unit: 'col',
      reversed: false,
    })),
    scrollApi.top.map(() => ({
      unit: 'row',
      reversed: true,
    })),
    scrollApi.bottom.map(() => ({
      unit: 'row',
      reversed: false,
    })),
  ] as Event<Pick<TScrollFxPayload, 'unit' | 'reversed'>>[],
  filter: ({ viewport }) => !!viewport.container,
  fn: ({ viewport, scroll }, { unit, reversed }) => ({
    aborter: new AbortController(),
    container: viewport.container as TScrollFxPayload['container'],
    cell: viewport.cell,
    position: scroll.position,
    limit: scroll.limit,
    unit,
    reversed,
  }),
  target: [stopScrollFx, scrollFx],
})

sample({
  source: scrollFx,
  clock: scrollApi.stop,
  fn: ({ aborter }) => aborter,
  target: stopScrollFx,
})
