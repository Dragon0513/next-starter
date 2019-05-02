import React, { Fragment } from 'react'

import AppActions from 'REDUX/app/actions'
import Button from '@material-ui/core/Button'
import Empty from 'COMPONENTS/base/Empty'
import Icon from 'COMPONENTS/base/Icon'
import Image from 'COMPONENTS/base/Image'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { palettePrimaryMain } from 'UTILS/theme'
import styled from 'styled-components'

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
        <Image
          color='#040507'
          src='https://images.unsplash.com/photo-1444966450559-356cef77103f'
          srcSet={{
            xs: 'https://images.unsplash.com/photo-1444966450559-356cef77103f',
            sm: 'https://images.unsplash.com/photo-1548245642-7319f6fb1b1d'
          }}
          gradient={{
            width: '20%'
          }}
        >
          <Empty height='30rem' />
        </Image>

        <Image
          color='#dfdfdf'
          direction='horizontal'
          src='https://images.unsplash.com/photo-1444966450559-356cef77103f'
        >
          <Empty height='10rem' />
        </Image>
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
