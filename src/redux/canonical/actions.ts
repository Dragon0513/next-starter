import { createActions } from 'redux-actions'
import { Dispatch } from 'redux'

const { fetchData, receiveData } = createActions('FETCH_DATA', 'RECEIVE_DATA')

const shouldFetch = (state, config) => {
  const { loading, updateTime } = state || {}
  const { ttl } = config

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

export const defaultFormate = data => data

interface TryToFetchDto {
  location: string
  key: string
  fetchFunc: () => void
  formate?: () => any
  ttl?: number
}

// TODO:
export const tryToFetch: (options: TryToFetchDto) => any = ({
  location,
  key,
  fetchFunc,
  formate = defaultFormate,
  ttl = 0
}) => async (dispatch: Dispatch, getState) => {
  const state = getState()
  const data = state[location][key]

  if (!shouldFetch(data, { ttl })) {
    return null
  }

  dispatch(fetchData({ location, key }))
  const res = await fetchFunc()
  const formateData = formate(res, state)
  dispatch(receiveData({ location, key, data: formateData }))
  return formateData
}
