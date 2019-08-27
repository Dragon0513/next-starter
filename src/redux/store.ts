import { createStore, applyMiddleware, Store } from 'redux'
import { autoDispatch } from 'redux-control'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import env from 'ENV'

import reducers from '../redux/reducers'

const middleware = [thunk]

if (env.env !== 'production') {
  // @ts-ignore
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
