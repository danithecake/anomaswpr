export type TPosition = {
  col: number
  row: number
} // int

export type TScroll = {
  position: TPosition
  limit: TPosition
}

export type TViewport = {
  container: HTMLDivElement | null
  cols: number // int
  rows: number // int
  width: number // px
  height: number // px
  cell: number // px
}

export type TCell = {
  id: string
  position: TPosition
}

export type TGrid = TCell[][]
