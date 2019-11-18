const routers = require('./config/routers')
const { alias, loaders, plugins } = require('./config/webpack.base')

module.exports = {
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
  exportPathMap: async function () {
    return routers
  }
}
