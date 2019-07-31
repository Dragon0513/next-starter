import { createActions } from 'redux-actions'
import { tryToFetch } from 'REDUX/canonical/actions'
import { ThunkAction } from 'redux-thunk'
import { RootStateTypes } from 'TYPES/redux';

const { initApp } = createActions('INIT_APP')

const getDate = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'redux' })
  }, 10000)
})

const tryToFetchLocationsConfig: () => ThunkAction<void, RootStateTypes, void, any> = () => (dispatch) => {
  dispatch(
    tryToFetch({
      location: 'app',
      key: 'locationsConfig',
      fetchFunc: getDate
    })
  )
}

export default {
  initApp,
  tryToFetchLocationsConfig
}
