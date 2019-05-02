import React, { PureComponent } from 'react'

import styled from 'styled-components'

const SVG = styled(({ width, height, m, color, ...other }) => (
  <svg {...other} />
))`
  width: ${props => props.width || '1em'};
  height: ${props => props.height || '1em'};
  margin: ${props => props.m || 0};
  color: ${props => props.color};
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`

class Icon extends PureComponent {
  render () {
    const { name, ...props } = this.props
    return (
      <SVG aria-hidden='true' {...props}>
        <use xlinkHref={`#${name}`} />
      </SVG>
    )
  }
}

export default Icon
