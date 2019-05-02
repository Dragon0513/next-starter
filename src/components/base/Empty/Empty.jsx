import React from 'react'
import styled from 'styled-components'

const Empty = styled(({ width, height, ...other }) => <div {...other} />)`
  width: ${props => props.width};
  height: ${props => props.height};
`

export default Empty
