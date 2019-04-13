import { handleActions } from 'redux-actions'

const initialState = {
  language: ''
}

const appReducers = handleActions(
  {
    INIT_APP: (state, action) => {
      return {}
    }
  },
  initialState
)

export default appReducers
