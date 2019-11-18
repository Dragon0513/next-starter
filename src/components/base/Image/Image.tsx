import React from 'react'
import { breakpointsDown } from 'UTILS/theme'
import styled from 'styled-components'
interface Gradient {
  width: string
}

type SrcKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface SrcSet {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export interface ImageProps {
  src?: string
  srcSet: SrcSet // TODO:
  gradient?: Gradient | null // TODO:
  pictureProps?: object
  color?: string
}

const Banner = styled(({ color, ...props }) => <div {...props} />)`
  position: relative;
  overflow: hidden;
  background: ${props => props.color};
`

const Content = styled.div`
  position: relative;
`

const VerticalPicture = styled.picture`
  position: absolute;
  display: block;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
`

const VerticalImage = styled.img`
  height: 100%;
  user-select: none;
`

const pick: (key: string) => (props: any) => string = key => props => props[key]

// prettier-ignore
const Gradient = styled(({ color, width, ...props }) => <div {...props} />)`
  position: absolute;
  width: ${pick('width')};
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, ${pick('color')} 0%, rgba(0, 0, 0, 0) 100%);
`

// prettier-ignore
const GradientRight = styled(Gradient)`
  left: unset;
  right: 0;
  background-image: linear-gradient(to left, ${pick('color')} 0%, rgba(0, 0, 0, 0) 100%);
`

const Image: React.FC<ImageProps> = props => {
  const {
    src,
    srcSet = {},
    gradient,
    children,
    pictureProps,
    color,
    ...otherProps
  } = props

  const objectKeys = Object.keys(srcSet) as SrcKey[]

  const set = objectKeys.map(key => ({
    media: breakpointsDown(key).replace('@media', ''),
    srcSet: srcSet[key]
  }))

  return (
    <Banner color={color} {...otherProps}>
      <VerticalPicture {...pictureProps}>
        {set.map(item => (
          <source media={item.media} srcSet={item.srcSet} key={item.media} />
        ))}
        <VerticalImage src={src} draggable={false} />
        {gradient && <Gradient color={color} width={gradient.width} />}
        {gradient && <GradientRight color={color} width={gradient.width} />}
      </VerticalPicture>
      <Content>{children}</Content>
    </Banner>
  )
}

export default Image
