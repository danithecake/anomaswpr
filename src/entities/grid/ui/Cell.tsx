import { TCell } from '../types'
import cssModule from './Cell.module.css'

export const Cell: FC<{ cell: TCell }> = () => (
  <div className={cssModule.container}>
    <div className={cssModule.content} />
  </div>
)
