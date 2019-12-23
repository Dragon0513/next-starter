const { resolve } = require('path')

const ROOT_PATH = resolve(__dirname, '../../../')
const alias = {
  API: resolve(ROOT_PATH, './src/api'),
  COMPONENTS: resolve(ROOT_PATH, './src/components'),
  CONTAINERS: resolve(ROOT_PATH, './src/containers'),
  REDUX: resolve(ROOT_PATH, './src/redux'),
  RESOURCE: resolve(ROOT_PATH, './src/resource'),
  ENV: resolve(ROOT_PATH, './config/env'),
  UTILS: resolve(ROOT_PATH, './src/utils'),
  CONFIG: resolve(ROOT_PATH, './config')
}

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        ...alias
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
