import { JSX, MouseEventHandler } from 'react'
import { ButtonSize } from './constants'

export type TButtonBaseProps = {
  size?: `${ButtonSize}`
  className?: Partial<{
    container: string
    content: string
    underlayer: string
  }>
  onMouseDown?: MouseEventHandler
} & (
  | {
      label: string
      icon?: {
        left?: JSX.Element
        center?: never
        right?: JSX.Element
      }
    }
  | ({
      label?: never
    } & (
      | {
          icon: {
            left?: never
            center?: JSX.Element
            right?: never
          }
        }
      | {
          icon: {
            left?: JSX.Element
            center?: never
            right?: JSX.Element
          }
        }
    ))
) &
  (
    | {
        onClick: MouseEventHandler
        onMouseUp?: never
      }
    | {
        onClick?: never
        onMouseUp: MouseEventHandler
      }
  )
