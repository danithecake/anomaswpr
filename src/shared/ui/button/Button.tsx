import clsx from 'clsx'
import { useMemo } from 'react'
import { ButtonBase } from './ButtonBase'
import { ButtonSize } from './constants'
import { TButtonBaseProps } from './types'

type TButtonProps = Omit<TButtonBaseProps, 'className'> & {
  vertical?: boolean
}

export const Button: FC<TButtonProps> = ({
  size = ButtonSize.Medium,
  vertical = false,
  ...props
}) => {
  const className = useMemo<TButtonBaseProps['className']>(
    () => ({
      container: clsx(
        size === ButtonSize.Medium &&
          '[--isometric-float-min:4px] [--isometric-float-max:6px]'
      ),
      content: clsx(
        size === ButtonSize.Medium &&
          clsx(
            vertical ? 'min-h-24 w-10' : 'h-10 min-w-24',
            'group-hover/button:translate-y-[1px] group-hover/button:translate-x-[1px]',
            'group-[.active]/button:translate-y-[3px] group-[.active]/button:translate-x-[3px]'
          )
      ),
    }),
    [size, vertical]
  )
  return <ButtonBase {...(props as TButtonBaseProps)} className={className} />
}
