import AppActions from 'REDUX/app/actions'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RootStateTypes } from 'TYPES/redux'

const withRoot = (Component: React.ElementType) => {
  class WithRoot extends React.PureComponent {
    render () {
      console.log(this.props)
      const { ...props } = this.props

      return <Component {...props} />
    }
  }

  const mapStateToProps = (state: RootStateTypes) => {
    const { app } = state

    return {
      app
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators(AppActions, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithRoot)
}

export default withRoot
