const { resolve } = require('path')
const { DefinePlugin } = require('webpack')

const alias = {
  API: resolve(__dirname, '../src/api'),
  COMPONENTS: resolve(__dirname, '../src/components'),
  CONTAINERS: resolve(__dirname, '../src/containers'),
  REDUX: resolve(__dirname, '../src/redux'),
  RESOURCE: resolve(__dirname, '../src/resource'),
  ENV: resolve(__dirname, '../env'),
  UTILS: resolve(__dirname, '../src/utils')
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
  })
]

const loaders = [cssLoader, svgLoader]

module.exports = {
  alias,
  loaders,
  plugins
}
