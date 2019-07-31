import { handleActions } from 'redux-actions'

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
}

const canonical = handleActions({
  FETCH_DATA: (state, action) => {
    const { location, key } = action.payload

    return {
      ...state,
      [location]: {
        ...state[location],
        [key]: state[location][key],
        [`${key}Loading`]: {
          loading: true,
          loadingTime: new Date().valueOf()
        }
      }
    }
  },

  RECEIVE_DATA: (state, action) => {
    const { location, key, data } = action.payload

    return {
      ...state,
      [location]: {
        ...state[location],
        [key]: data,
        [`${key}Loading`]: {
          ...state[location][`${key}Loading`],
          loading: false,
          updateTime: new Date().valueOf()
        }
      }
    }
  }
}, initialState)

export default canonical
