import * as React from 'react'

export interface SvgIconProps {
  name: string,
  width?: string,
  height?: string,
  onClick?: function,
}

declare const SvgIcon: React.ComponentType<SvgIconProps>

export default SvgIcon
