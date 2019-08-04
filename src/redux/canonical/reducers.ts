import { handleActions } from 'redux-actions'
import { fetchData, receiveData, FetchDatePayload, ReceiveDataPayload } from 'REDUX/canonical/actions'
import { RootStateTypes } from 'TYPES/redux';
import _ from 'lodash'

/**
 *  单个数据拥有的字段
 *  [key] {
 *    data: Any, // 数据
 *    loading: Bool, // 当前加载状态
 *    loadingTime: Number, // 数据加载时间
 *    updateTime: Number, // 数据更新时间
 *  }
 */
const initialState = {
  app: { name: '???', language: '...' }
}

const canonical = handleActions({
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
  }
}, initialState)

export default canonical
