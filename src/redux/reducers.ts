import { combineReducers } from 'redux'
import { useReduxSetter } from 'redux-control'

import app from './app/reducers'

export default useReduxSetter(combineReducers({ app }))
