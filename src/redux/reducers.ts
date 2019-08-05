import { combineReducers, compose, Reducer } from 'redux'
import { enableBatching } from 'redux-batched-actions'

import app from './app/reducers'
import canonical from './canonical/reducers'

// 抽离新插件
const useReduxSetter = (rootReducer: Reducer) =>
  enableBatching(
    (state: any, action: any) =>
      compose(
        (inState) => canonical(inState, action),
        rootReducer
      )(state, action)
  )

export default useReduxSetter(
  combineReducers({ app })
)
