import { combineReducers } from 'redux'
import useReduxControl from 'redux-control'

import app from './app/reducers'

export default useReduxControl(combineReducers({ app }))
