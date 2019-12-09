const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

const alias = {
  API: resolve(__dirname, '../src/api'),
  COMPONENTS: resolve(__dirname, '../src/components'),
  CONTAINERS: resolve(__dirname, '../src/containers'),
  REDUX: resolve(__dirname, '../src/redux'),
  RESOURCE: resolve(__dirname, '../src/resource'),
  ENV: resolve(__dirname, '../config/env'),
  UTILS: resolve(__dirname, '../src/utils'),
  CONFIG: resolve(__dirname, '../config')
}

const svgLoader = {
  test: /\.svg$/,
  use: [{ loader: 'svg-sprite-loader', options: {} }, 'svgo-loader']
}

const cssLoader = {
  test: /\.css$/,
  use: [{ loader: 'raw-loader' }]
}

const plugins = [
  new DefinePlugin({
    'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV),
    'process.env.npm_package_version': JSON.stringify(
      process.env.npm_package_version
    ),
    'process.env.BUILD_TIME': JSON.stringify(new Date()),
    'process.env.npm_package_gitHead': JSON.stringify(
      process.env.npm_package_gitHead
    )
  }),
  isProduction &&
    new ImageminPlugin({
      jpegtran: { progressive: true },
      pngquant: {
        quality: '95-100'
      }
    })
].filter(item => item)

const getWebpackConfig = () => {
  const loaders = [cssLoader, svgLoader]

  return {
    alias,
    loaders,
    plugins,
    isProduction
  }
}

module.exports = getWebpackConfig
