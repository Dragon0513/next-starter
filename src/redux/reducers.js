import { combineReducers, compose } from 'redux'

import app from './app/reducers'
import canonical from './canonical/reducers'

export default (state, action) => {
  return compose(
    inState => canonical(inState, action),
    combineReducers({
      app
    })
  )(state, action)
}
