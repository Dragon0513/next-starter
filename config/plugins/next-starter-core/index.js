const { DefinePlugin } = require('webpack')

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.plugins.push(
        new DefinePlugin({
          'process.env.npm_package_version': JSON.stringify(
            process.env.npm_package_version
          ),
          'process.env.BUILD_TIME': JSON.stringify(new Date()),
          'process.env.npm_package_gitHead': JSON.stringify(
            process.env.npm_package_gitHead
          ),
          'process.env.npm_package_dependencies_react': JSON.stringify(
            process.env.npm_package_dependencies_react
          )
        })
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
