const config = require('../env')
const { staticSuffix } = config

const routers = [
  '/index'
  // { key: '/api', page: '/apiPage' }
  // { key: '/weather/api', page: '/redirect/api' },
]

module.exports = routers.reduce((obj, item) => {
  const router = { ...obj }

  if (typeof item === 'string') {
    router[item] = { page: item }
    if (staticSuffix && staticSuffix !== '') {
      router[`${item}${staticSuffix}`] = { page: item }
    }
  } else {
    const { key, page, ...others } = item
    router[key] = { page, query: others }
    router[`${key}${staticSuffix}`] = { page, query: others }
  }

  return router
}, {})
