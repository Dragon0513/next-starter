import AppActions from 'REDUX/app/actions'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  font-size: 20px;
`

class App extends React.PureComponent {
  state = {}

  render () {
    const { actions } = this.props
    actions.initApp()

    return (
      <StyledButton variant='contained' color='primary'>
        Hello world
      </StyledButton>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
