import { createAction } from 'redux-actions'
import { RootStateTypes } from 'TYPES/redux'
import _ from 'lodash'
import { ThunkAction } from 'redux-thunk';

export interface FetchDatePayload {
  location: string
  key: string
}

export interface ReceiveDataPayload {
  location: string
  key: string
  data: any
}

export const fetchData = createAction<FetchDatePayload>('FETCH_DATA')
export const receiveData = createAction<ReceiveDataPayload>('RECEIVE_DATA')

interface LoadingStateTypes {
  loading?: boolean
  loadingTime?: number
  updateTime?: number
}

const shouldFetch = (state: RootStateTypes, options: FormatedOptinoTypes) => {
  const { ttl, location, key } = options
  const loadingState = _.get(state, `${location}.${key}Loading`, {}) as LoadingStateTypes
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
  location: string
  key: string
  fetchFunc: () => void
  formate?: (data: any) => any
  ttl?: number
}

interface FormatedOptinoTypes {
  location: string
  key: string
  fetchFunc: () => void
  formate: (data: any) => any
  ttl: number
}

const getDefaultOption: (options: TryToFetchOptionTypes) => FormatedOptinoTypes = (options) => {
  const {
    location,
    key,
    fetchFunc,
    formate = (data: any) => data,
    ttl = 0
  } = options

  return {
    location,
    key,
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
  const options = getDefaultOption(tryToFetchOption)
  const { location, key, fetchFunc, formate } = options

  const state = getState()

  if (!shouldFetch(state, options)) {
    return _.get(state, `${location}.${key}`)
  }

  dispatch(fetchData({ location, key }))
  const res = await fetchFunc()
  const formateData = formate(res)
  dispatch(receiveData({ location, key, data: formateData }))
  return formateData
}
