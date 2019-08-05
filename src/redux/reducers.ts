import { combineReducers, compose, Reducer } from 'redux'

import app from './app/reducers'
import canonical from './canonical/reducers'

// 抽离新插件
const useReduxSetter = (rootReducer: Reducer) => {
  return (state: any, action: any) => {
    return compose(
      (inState) => canonical(inState, action),
      rootReducer
    )(state, action)
  }
}

export default useReduxSetter(
  combineReducers({ app })
)
