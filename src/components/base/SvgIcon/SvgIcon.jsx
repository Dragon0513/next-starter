import React, { PureComponent } from 'react'
import styled from 'styled-components'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('RESOURCE/icon', true, /\.svg$/)
requireAll(req)

const SVG = styled(({ width, height, ...other }) => <svg {...other} />)`
  width: ${props => (props.width ? props.width : '1em')};
  height: ${props => (props.height ? props.height : '1em')};
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
`

class Icon extends PureComponent {
  render () {
    const { name, width, height, className, onClick } = this.props
    return (
      <SVG
        width={width}
        height={height}
        className={className}
        onClick={onClick}
        aria-hidden='true'
      >
        <use xlinkHref={`#${name}`} />
      </SVG>
    )
  }
}

export default Icon
