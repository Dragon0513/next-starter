import React from 'react'
import { breakpointsDown } from 'UTILS/theme'
import styled from 'styled-components'

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

const p = key => props => props[key]

// prettier-ignore
const Gradient = styled(({ color, width, ...props }) => <div {...props} />)`
  position: absolute;
  width: ${p('width')};
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, ${p('color')} 0%, rgba(0, 0, 0, 0) 100%);
`

// prettier-ignore
const GradientRight = styled(Gradient)`
  left: unset;
  right: 0;
  background-image: linear-gradient(to left, ${p('color')} 0%, rgba(0, 0, 0, 0) 100%);
`

function Image(props) {
  const {
    src,
    srcSet = {},
    gradient,
    children,
    pictureProps,
    color,
    ...otherProps
  } = props

  const set = Object.keys(srcSet).map(key => ({
    media: breakpointsDown(key).replace('@media', ''),
    srcSet: srcSet[key]
  }))

  return (
    <Banner color={color} {...otherProps}>
      <VerticalPicture {...pictureProps}>
        {set.map(item => (
          <source media={item.media} srcSet={item.srcSet} key={item.media} />
        ))}
        <VerticalImage src={src} draggable='false' />
        {gradient && <Gradient color={color} width={gradient.width} />}
        {gradient && <GradientRight color={color} width={gradient.width} />}
      </VerticalPicture>
      <Content>{children}</Content>
    </Banner>
  )
}

export default Image
