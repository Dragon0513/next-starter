const { alias, loaders, plugins } = require('./config/webpack.base')
const env = require('./env')
const withTypescript = require('@zeit/next-typescript')

const { staticSuffix } = env

const routers = ['/index']

module.exports = withTypescript({
  webpack: config => {
    // Perform customizations to webpack config
    // Important: return the modified config
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/utils/polyfills.js')
      ) {
        entries['main.js'].unshift('./src/utils/polyfills.js')
      }

      return entries
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias
    }

    config.module.rules.push(...loaders)

    config.plugins.push(...plugins)

    config.output.jsonpFunction = 'webpackJsonp_next_starter'

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
  exportPathMap: async function() {
    return routers.reduce((destination, item) => {
      if (typeof item === 'string') {
        return {
          ...destination,
          [item]: { page: item },
          [`${item}${staticSuffix}`]: { page: item }
        }
      } else {
        const { key, page } = item
        return {
          ...destination,
          [key]: { page },
          [`${key}${staticSuffix}`]: { page }
        }
      }
    }, {})
  }
})
