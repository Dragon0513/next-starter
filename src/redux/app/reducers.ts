import { handleActions } from 'redux-actions'

const initialState = {
  language: '',
  level1: {
    level2: {
      level3: {
        name: '???'
      }
    },
    array: [
      {
        name: 1,
      },
      {
        name: 2
      }
    ]
  }
}

const appReducers = handleActions(
  {
    INIT_APP: (state) => {
      return state
    }
  },
  initialState
)

export default appReducers
