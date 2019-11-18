import config from 'CONFIG/env'
import configureStore from 'REDUX/store'
import axios from 'axios'

axios.defaults.withCredentials = true

const { service } = config
const { main, mock } = service

const handler = res => {
  const { data } = res
  return data
}

const getApiServer = useMock => {
  return useMock ? mock : main
}

const errorHandler = error => {
  if (error.response && error.response.data) {
    // const {
    //   message
    //   error: errorType
    // } = error.response.data
    // const store = configureStore()
  }
  return null
}

const wait = time => () =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

const getOption = async () => {
  const store = configureStore()
  let isLogin = null

  while (isLogin === null) {
    const store = configureStore()
    const state = store.getState()
    const { user = {} } = state
    isLogin = user.isLogin

    await wait(100)()
  }

  const state = store.getState()
  const { user = {} } = state
  const { token } = user

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const postData = async (path, data, useMock) => {
  const option = await getOption()
  return axios
    .post(`${getApiServer(useMock)}${path}`, data, option)
    .then(handler)
    .catch(errorHandler)
}

export const deleteData = async (path, data, useMock) => {
  const option = await getOption()
  return axios
    .delete(
      `${getApiServer(useMock)}${path}`,
      Object.assign({ data: data }, option)
    )
    .then(handler)
    .catch(errorHandler)
}

export const getData = async (path, params, useMock) => {
  const option = await getOption()
  return axios
    .get(
      `${getApiServer(useMock)}${path}`,
      Object.assign({ params: params }, option)
    )
    .then(handler)
    .catch(errorHandler)
}

export const putData = async (path, data, useMock) => {
  const option = await getOption()
  return axios
    .put(`${getApiServer(useMock)}${path}`, data, option)
    .then(handler)
    .catch(errorHandler)
}

export const patchData = async (path, data, useMock) => {
  const option = await getOption()
  return axios
    .patch(`${getApiServer(useMock)}${path}`, data, option)
    .then(handler)
    .catch(errorHandler)
}

export const ApiPath = `${main}`
