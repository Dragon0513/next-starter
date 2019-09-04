import * as React from 'react'
import { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<T> {
  className: string
  decoration: boolean
  color: string
}

declare const Link: React.ComponentType<LinkProps>

export default Link
