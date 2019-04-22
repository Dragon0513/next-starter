import * as React from 'react'

export interface IconProps {
  name: string,
  width?: string,
  height?: string,
  m?: function,
}

declare const Icon: React.ComponentType<IconProps>

export default Icon
