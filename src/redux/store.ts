import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import env from 'ENV'

import reducers from '../redux/reducers'

const middleware = [ thunk ]

if (env.env !== 'production') {
  // @ts-ignore
  middleware.push(createLogger({}))
}

let store: any = null

const configureStore = () => {
  if (!store) {
    store = createStore(
      // @ts-ignore
      reducers,
      applyMiddleware(...middleware)
    )
  }
  return store
}

export default configureStore
