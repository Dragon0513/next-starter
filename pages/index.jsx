import Empty from 'COMPONENTS/base/Empty'
import Icon from 'COMPONENTS/base/Icon'
import Image from 'COMPONENTS/base/Image'
import AppActions from 'REDUX/app/actions'
import { set } from 'redux-control'
import { palettePrimaryMain } from 'UTILS/theme'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const StyledButton = styled(Button)`
  font-size: 50px;
`

class App extends React.Component {
  state = {}

  componentDidMount () {
    AppActions.initApp()

    const fetch = async () => {
      set('app.level1.array[1].name', 'english?')
      console.log('fetch1')
      const data1 = await AppActions.tryToFetchLocationsConfig()
      console.log('data1', data1)

      console.log('fetch2')
      const data2 = await AppActions.tryToFetchLocationsConfig()
      console.log('data2', data2)
    }

    fetch()
  }

  componentWillUpdate (nextProps) {
    const { level1 } = this.props
    const { level1: nextlevel1 } = nextProps

    console.log(level1, nextlevel1)
    console.log(level1 === nextlevel1)
  }

  render () {
    return (
      <>
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
      </>
    )
  }
}

const mapStateToProps = state => {
  return { level1: state.app.level1 }
}

export default connect(mapStateToProps)(App)
