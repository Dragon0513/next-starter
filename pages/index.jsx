import Icon from 'COMPONENTS/base/Icon'
import AppActions from 'REDUX/app/actions'
import { palettePrimaryMain } from 'UTILS/theme'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  font-size: 20px;
`

class App extends React.PureComponent {
  state = {}

  componentDidMount () {
    const { actions } = this.props
    actions.initApp()
  }

  render () {
    return (
      <Fragment>
        <StyledButton variant='contained' color='primary'>
          Hello world
        </StyledButton>
        <Icon name='success' m='0 0 0 8px' color={palettePrimaryMain()} />
      </Fragment>
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
