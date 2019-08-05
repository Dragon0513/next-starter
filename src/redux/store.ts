import { createStore, applyMiddleware, Store, AnyAction } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { enableBatching } from 'redux-batched-actions'
import env from 'ENV'

import reducers from '../redux/reducers'

const middleware = [ thunk ]

if (env.env !== 'production') {
  // @ts-ignore
  middleware.push(createLogger({}))
}

let REDUX_STORE: Store | null = null

const getStore: () => Store = () => {
  if (!REDUX_STORE) {
    // TODO:
    // @ts-ignore
    REDUX_STORE = createStore(enableBatching(reducers), applyMiddleware(...middleware))
  }
  return REDUX_STORE as Store
}

export default getStore

export const dispatch = (action: AnyAction) => {
  getStore().dispatch(action)
}
