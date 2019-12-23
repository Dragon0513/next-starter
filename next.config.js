const routers = require('./config/routers')
const withPlugins = require('next-compose-plugins')

const withVersionInfo = require('./config/plugins/version-info')
const withPolyfills = require('./config/plugins/polyfills')
const withCss = require('./config/plugins/styled-components-css')
const withSvgSprite = require('./config/plugins/svg-sprite')
const withSqip = require('./config/plugins/sqip')
const withNextStarter = require('./config/plugins/next-starter-core')
const withAlias = require('./config/plugins/alias')

module.exports = withPlugins(
  [
    withAlias,
    withVersionInfo,
    withPolyfills,
    withCss,
    withSvgSprite,
    withSqip,
    withNextStarter,
    { versionInfoOptions: {} }
  ],
  {
    exportPathMap: async function () {
      return routers
    }
  }
)
