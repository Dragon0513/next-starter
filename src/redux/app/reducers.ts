import { handleActions } from 'redux-actions'

const initialState = {
  language: ''
}

const appReducers = handleActions(
  {
    INIT_APP: (state, action) => {
      return state
    }
  },
  initialState
)

export default appReducers
