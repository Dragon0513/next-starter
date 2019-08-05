import { createAction } from 'redux-actions'
import { RootStateTypes } from 'TYPES/redux'
import _ from 'lodash'
import { ThunkAction } from 'redux-thunk'
import { batchActions } from 'redux-batched-actions'
import castPath from './utils/castPath'

export interface FetchDatePayload {
  location: string
  key: string
}

export interface ReceiveDataPayload {
  location: string
  key: string
  data: any
}

type Many<T> = T | ReadonlyArray<T>
type PropertyName = string | number | symbol;
type PropertyPath = Many<PropertyName>

export interface SetDataPayload {
  path: string[]
  data: any
}

export const setData = createAction<SetDataPayload>('SET_DATA')

// TODO: 添加部分数组快速操作语法糖
export const set: (
  path: PropertyPath,
  data: any
) => ThunkAction<void, RootStateTypes, void, any> = (path, data) => (dispatch, getState) => {
  const state = getState()
  const arrayPath = castPath(path, state)
  dispatch(setData({ path: arrayPath, data }))
}

interface LoadingStateTypes {
  loading?: boolean
  loadingTime?: number
  updateTime?: number
}

const getLoadingPath = (path: string[]) => {
  return path.map((item, index) => (
    index === path.length - 1
      ? `${item}@Loading`
      : item
  ))
}

const shouldFetch = (state: RootStateTypes, options: FormatedOptinoTypes) => {
  const { ttl, path } = options

  const loadingState = _.get(state, getLoadingPath(path), {}) as LoadingStateTypes
  const { loading, updateTime } = loadingState

  if (loading) {
    return false
  }
  if (!updateTime) {
    return true
  }
  const now = new Date().valueOf()
  if (updateTime + ttl > now) {
    return false
  }
  return true
}

interface TryToFetchOptionTypes {
  path: PropertyPath,
  fetchFunc: () => void
  formate?: (data: any) => any
  ttl?: number
}

interface FormatedOptinoTypes {
  path: string[]
  fetchFunc: () => void
  formate: (data: any) => any
  ttl: number
}

const getDefaultOption: (
  options: TryToFetchOptionTypes,
  state: RootStateTypes
) => FormatedOptinoTypes = (options, state) => {
  const {
    path,
    fetchFunc,
    formate = (data: any) => data,
    ttl = 0
  } = options

  const arrayPath = castPath(path, state)

  return {
    path: arrayPath,
    fetchFunc,
    formate,
    ttl
  }
}

// TODO:
/**
 * loading key 可配置
 * 使用特殊的key，'Loading' 太容易冲突
 */
export const tryToFetch: (
  tryToFetchOption: TryToFetchOptionTypes
) => ThunkAction<any, RootStateTypes, void, any> = (tryToFetchOption) => async (dispatch, getState) => {
  const state = getState()
  const options = getDefaultOption(tryToFetchOption, state)
  const { path, fetchFunc, formate } = options

  if (!shouldFetch(state, options)) {
    return _.get(state, path)
  }

  const loadingPath = getLoadingPath(path)

  dispatch(set(loadingPath, {
    loading: true,
    loadingTime: new Date().valueOf()
  }))
  const res = await fetchFunc()
  const formateData = formate(res)
  const loadingState = _.get(getState(), loadingPath)

  dispatch(batchActions(
    [
      setData({
        path,
        data: formateData
      }),
      setData({
        path: loadingPath,
        data: {
          ...loadingState,
          loading: false,
          updateTime: new Date().valueOf()
        }
      })
    ],
    'RECEIVE_DATA'
  ))

  return formateData
}
