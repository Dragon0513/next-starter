import { handleActions } from 'redux-actions'
import {  setData, SetDataPayload } from 'REDUX/canonical/actions'
import { RootStateTypes } from 'TYPES/redux';
import _, { isObject } from 'lodash'

import toKey from './utils/toKey'
import isIndex from './utils/isIndex'
import assignValue from './utils/assignValue'

const initialState = {} as any

const canonical = handleActions<RootStateTypes, any>({
  [setData.toString()]: (state: RootStateTypes, action: { payload: SetDataPayload }) => {
    const { path, data } = action.payload

    const length = path.length
    const lastIndex = length - 1

    let index = -1
    const newState = { ...state } as any
    let nested = newState

    while (nested != null && ++index < length) {
      const key = toKey(path[index]) as string
      let newValue = data

      if (index !== lastIndex) {
        const objValue = nested[key]
        newValue = isObject(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {})
        if (Array.isArray(objValue)) {
          newValue = [...newValue]
        } else {
          newValue = { ...newValue }
        }
      }
      assignValue(nested, key, newValue)
      nested = nested[key]
    }

    return newState
  }
}, initialState)

export default canonical
