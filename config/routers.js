// const config = require('../config/env')
// const { staticSuffix } = config

const routers = [
  '/index'
  // { key: '/api', page: '/apiPage' }
  // { key: '/weather/api', page: '/redirect/api' },
]

module.exports = routers.reduce((obj, item) => {
  const router = { ...obj }

  if (typeof item === 'string') {
    router[item] = { page: item }
    // TODO: check
    // if (staticSuffix && staticSuffix !== '') {
    //   router[`${item}${staticSuffix}`] = { page: item }
    // }
  } else {
    const { key, page, ...others } = item
    router[key] = { page, query: others }
    // TODO: check
    // router[`${key}${staticSuffix}`] = { page, query: others }
  }

  return router
}, {})
