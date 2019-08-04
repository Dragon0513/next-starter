import { handleActions } from 'redux-actions'
import { fetchData, receiveData, FetchDatePayload, ReceiveDataPayload, setData, SetDataPayload } from 'REDUX/canonical/actions'
import { RootStateTypes } from 'TYPES/redux';
import _, { isObject } from 'lodash'

import castPath from './utils/castPath'
import toKey from './utils/toKey'
import isIndex from './utils/isIndex'
import assignValue from './utils/assignValue'

/**
 *  单个数据拥有的字段
 *  [key] {
 *    data: Any, // 数据
 *    loading: Bool, // 当前加载状态
 *    loadingTime: Number, // 数据加载时间
 *    updateTime: Number, // 数据更新时间
 *  }
 */
const initialState = {} as any

const canonical = handleActions<RootStateTypes, any>({
  [fetchData.toString()]: (state: RootStateTypes, action: { payload: FetchDatePayload }) => {
    const { location, key } = action.payload
    const locationState = _.get(state, location)

    return {
      ...state,
      [location]: {
        ...locationState,
        [key]: locationState[key],
        [`${key}Loading`]: {
          loading: true,
          loadingTime: new Date().valueOf()
        }
      }
    }
  },

  [receiveData.toString()]: (state: RootStateTypes, action: { payload: ReceiveDataPayload }) => {
    const { location, key, data } = action.payload
    const locationState = _.get(state, location)

    return {
      ...state,
      [location]: {
        ...locationState,
        [key]: data,
        [`${key}Loading`]: {
          ...locationState[`${key}Loading`],
          loading: false,
          updateTime: new Date().valueOf()
        }
      }
    }
  },

  [setData.toString()]: (state: RootStateTypes, action: { payload: SetDataPayload }) => {
    const { path, data } = action.payload
    const arrayPath = castPath(path, state)

    const length = arrayPath.length
    const lastIndex = length - 1

    let index = -1
    const newState = { ...state } as any
    let nested = newState

    while (nested != null && ++index < length) {
      const key = toKey(arrayPath[index]) as string
      let newValue = data

      if (index !== lastIndex) {
        const objValue = nested[key]
        newValue = isObject(objValue)
            ? objValue
            : (isIndex(arrayPath[index + 1]) ? [] : {})
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
