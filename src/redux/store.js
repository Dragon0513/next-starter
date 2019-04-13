import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import env from 'ENV'

import reducers from '../redux/reducers'

const middleware = [ thunk ]

if (env.env !== 'production') {
  middleware.push(createLogger())
}

let store = null

const configureStore = () => {
  if (!store) {
    store = createStore(
      reducers,
      applyMiddleware(...middleware)
    )
  }
  return store
}

export default configureStore
