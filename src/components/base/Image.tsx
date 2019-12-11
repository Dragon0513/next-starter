import { breakpointsDown, fp } from 'UTILS/theme'
import React, { useEffect, useState } from 'react'
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
  src:
    | string
    | {
        src: string
        preview: string
      }
  srcSet?: SrcSet // TODO:
  gradient?: Gradient | null // TODO:
  pictureProps?: object
  color?: string
}

const Banner = styled(props => <div {...fp(props, ['color'])} />)`
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
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
`

const VerticalPreviewImage = styled(VerticalImage)`
  transition: all ease 1000ms;
`

const pick: (key: string) => (props: any) => string = key => props => props[key]

// prettier-ignore
const Gradient = styled((props) => <div {...fp(props, ['color', 'width'])} />)`
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

  const isStringSrc = typeof src === 'string'
  const [loading, setLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState('')
  const [time] = useState(new Date().valueOf())

  const onImageLoad = () => {
    setLoading(false)
  }

  let imagePreview = ''

  if (typeof src === 'string') {
    imagePreview = ''
  } else {
    imagePreview = src.preview
  }

  useEffect(() => {
    if (typeof src === 'string') {
      setImageSrc(src)
    } else {
      setImageSrc(src.src)
    }
  })

  const spend = new Date().valueOf() - time

  return (
    <Banner color={color} {...otherProps}>
      <VerticalPicture {...pictureProps}>
        {set.map(item => (
          <source media={item.media} srcSet={item.srcSet} key={item.media} />
        ))}
        <VerticalImage src={imageSrc} onLoad={onImageLoad} draggable={false} />
        {!isStringSrc && (
          <VerticalPreviewImage
            src={imagePreview}
            draggable={false}
            style={{
              opacity: loading ? 0.95 : 0,
              transition: spend > 300 ? 'all ease-in-out 1s' : 'none'
            }}
          />
        )}
        {gradient && <Gradient color={color} width={gradient.width} />}
        {gradient && <GradientRight color={color} width={gradient.width} />}
      </VerticalPicture>
      <Content>{children}</Content>
    </Banner>
  )
}

export default Image
