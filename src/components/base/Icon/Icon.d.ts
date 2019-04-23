import * as React from 'react'

export interface IconProps {
  name: string,
  width?: string,
  height?: string,
  color?: string,
  m?: string
}

declare const Icon: React.ComponentType<IconProps>

export default Icon
