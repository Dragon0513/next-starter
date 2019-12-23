const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const ImageminPlugin = require('imagemin-webpack-plugin').default

const getImageLoader = config => ({
  test: /\.(png|jpe?g)$/,
  use: [
    {
      loader: 'sqip-loader',
      options: {
        numberOfPrimitives: 20,
        blur: 4,
        skipPreviewIfBase64: true
      }
    },
    {
      loader: 'url-loader',
      options: {
        fallback: 'file-loader',
        limit: '8192',
        publicPath: '/_next/static/images/',
        outputPath: `${config.isServer ? '../' : ''}static/images/`,
        name: '[name]-[hash].[ext]'
      }
    }
  ]
})

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (webpackConfig, options) {
      webpackConfig.module.rules.push(getImageLoader(options))

      if (isProduction) {
        webpackConfig.plugins.push(
          new ImageminPlugin({
            jpegtran: { progressive: true },
            pngquant: {
              quality: '95-100'
            }
          })
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options)
      }

      return Object.assign({}, webpackConfig)
    }
  })
}
