export type TCell = {
  id: number
  position: {
    col: number
    row: number
  }
}

export type TGridBounds = {
  cell: number
  gutter: {
    inner: number
    outter: number
    full: number
  }
  width: {
    full: number
    visible: number
  }
  height: {
    full: number
    visible: number
  }
} // px

export type TGrid = {
  bounds: TGridBounds
  cells: TCell[]
}
