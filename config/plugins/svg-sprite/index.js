const svgLoader = {
  test: /\.svg$/,
  use: [{ loader: 'svg-sprite-loader', options: {} }, 'svgo-loader']
}

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.module.rules.push(svgLoader)

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
