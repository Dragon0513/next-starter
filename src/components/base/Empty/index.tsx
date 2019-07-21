import { breakpointsDown } from 'UTILS/theme'
import React from 'react'
import styled from 'styled-components'

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly width?: string
  readonly height?: string
}

const Empty = styled.div<EmptyProps>`
  width: ${props => props.width};
  height: ${props => props.height};
`

export default Empty
