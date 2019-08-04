import { combineReducers, compose } from 'redux'
import { RootStateTypes } from 'TYPES/redux'

import app from './app/reducers'
import canonical from './canonical/reducers'

export default (state: RootStateTypes, action: any) => {
  return compose(
    (inState: any) => canonical(inState, action),
    combineReducers({
      app
    })
  )(state, action)
}
