import { createStore, applyMiddleware, Store, Middleware } from 'redux'
import { autoDispatch } from 'redux-control'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import env from 'CONFIG/env'

import reducers from '../redux/reducers'

const middleware: Middleware[] = [thunk]

if (env.env !== 'production') {
  middleware.push(createLogger({}))
}

let REDUX_STORE: Store | null = null

const getStore: () => Store = () => {
  if (!REDUX_STORE) {
    REDUX_STORE = createStore(reducers, applyMiddleware(...middleware))
    autoDispatch(REDUX_STORE)
  }
  return REDUX_STORE as Store
}

export default getStore
