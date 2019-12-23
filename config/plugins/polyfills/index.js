const path = require('path')

const polyfillPath = path.resolve(__dirname, './polyfills.js')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      const originalEntry = webpackConfig.entry
      webpackConfig.entry = async () => {
        const entries = await originalEntry()

        if (entries['main.js'] && !entries['main.js'].includes(polyfillPath)) {
          entries['main.js'].unshift(polyfillPath)
        }

        return entries
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
