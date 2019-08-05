import { get } from 'lodash'
import { ThunkAction } from 'redux-thunk'
import { batchActions } from 'redux-batched-actions'
import castPath from './utils/castPath'
import { Action } from 'redux'

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

const setData: (option: SetDataPayload) => Action = (option) => ({
  type: `SET_DATA_@${option.path.join('.')}`,
  payload: option
})

// TODO: 添加部分数组快速操作语法糖
export const set: (
  path: PropertyPath,
  data: any
) => ThunkAction<void, any, void, any> = (path, data) => (dispatch, getState) => {
  const state = getState()
  const arrayPath = castPath(path, state)
  dispatch(setData({ path: arrayPath, data }))
}

interface LoadingStateTypes {
  loading?: boolean
  loadingTime?: number
  updateTime?: number
}

const getLoadingPath = (path: string[], loadingSuffix: string) => {
  return path.map((item, index) => (
    index === path.length - 1
      ? `${item}${loadingSuffix}`
      : item
  ))
}

const shouldFetch = (state: any, options: FormatedOptinoTypes) => {
  const { ttl, path, loadingSuffix } = options

  const loadingState = get(state, getLoadingPath(path, loadingSuffix), {}) as LoadingStateTypes
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
  loadingSuffix?: string
}

interface FormatedOptinoTypes {
  path: string[]
  fetchFunc: () => void
  formate: (data: any) => any
  ttl: number
  loadingSuffix: string
}

const getDefaultOption: (
  options: TryToFetchOptionTypes,
  state: any
) => FormatedOptinoTypes = (options, state) => {
  const {
    path,
    fetchFunc,
    formate = (data: any) => data,
    ttl = 0,
    loadingSuffix = '@Loading'
  } = options

  const arrayPath = castPath(path, state)

  return {
    path: arrayPath,
    fetchFunc,
    formate,
    ttl,
    loadingSuffix
  }
}

// TODO:
/**
 * loading key 可配置
 * 使用特殊的key，'Loading' 太容易冲突
 */
export const tryToFetch: (
  tryToFetchOption: TryToFetchOptionTypes
) => ThunkAction<any, any, void, any> = (tryToFetchOption) => async (dispatch, getState) => {
  const state = getState()
  const options = getDefaultOption(tryToFetchOption, state)
  const { path, fetchFunc, formate, loadingSuffix } = options

  if (!shouldFetch(state, options)) {
    return get(state, path)
  }

  const loadingPath = getLoadingPath(path, loadingSuffix)

  dispatch(set(loadingPath, {
    loading: true,
    loadingTime: new Date().valueOf()
  }))
  const res = await fetchFunc()
  const formateData = formate(res)
  const loadingState = get(getState(), loadingPath)

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
