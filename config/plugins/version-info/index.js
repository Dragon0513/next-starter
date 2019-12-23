const { DefinePlugin } = require('webpack')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.plugins.push(
        new DefinePlugin({
          'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
        })
      )

      webpackConfig.output.jsonpFunction = 'webpackJsonp_next_starter'

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
