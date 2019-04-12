import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

class App extends React.PureComponent {
  state = {}

  render () {
    return <Title>hello world</Title>
  }
}

export default App
