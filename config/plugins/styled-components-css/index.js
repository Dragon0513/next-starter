const cssLoader = {
  test: /\.css$/,
  use: [{ loader: 'raw-loader' }]
}

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.module.rules.push(cssLoader)

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
