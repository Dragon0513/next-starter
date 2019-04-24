import * as React from 'react'
import { StandardProps } from '@material-ui/core';

export interface EmptyProps {
  width?: string,
  height?: string
}

declare const Empty: React.ComponentType<EmptyProps>

export default Empty
