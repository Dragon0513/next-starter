import * as React from 'react'
import { StandardProps } from '@material-ui/core';

interface Gradient {
  width: string
}

interface SrcSet {
  xs?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
}

export interface ImageProps {
  src?: string,
  srcSet?: SrcSet, // TODO:
  gradient?: Gradient | null, // TODO:
  pictureProps?: object,
  color?: string,
}

declare const Image: React.ComponentType<ImageProps>

export default Image
