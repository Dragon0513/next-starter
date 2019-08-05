import { combineReducers } from 'redux'
// @ts-ignore
import { useReduxSetter } from 'redux-control'

import app from './app/reducers'

export default useReduxSetter(combineReducers({ app }))
