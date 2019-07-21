import React, { FC } from 'react'
import styled from 'styled-components'

interface MySVGProps extends React.SVGAttributes<HTMLOrSVGElement> {
  width?: string
  height?: string
  m?: string
  color?: string
}

export interface IconProps extends MySVGProps {
  name: string
}

const MySVG: FC<MySVGProps> = ({ width, height, m, color, ...other }) => (
  <svg {...other} />
)

const SVG = styled(MySVG)`
  width: ${props => props.width || '1em'};
  height: ${props => props.height || '1em'};
  margin: ${props => props.m || 0};
  color: ${props => props.color};
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex: 0 0 auto;
`

const Icon: FC<IconProps> = ({ name, ...props }) => (
  <SVG aria-hidden='true' {...props}>
    <use xlinkHref={`#${name}`} />
  </SVG>
)

export default Icon
