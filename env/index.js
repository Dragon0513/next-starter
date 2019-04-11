const merge = require('lodash.merge')
const common = require('./env/base')
const env = process.env.BUILD_ENV || 'development'
const config = require(`./env/${env}`)

module.exports = merge(common, config, { env })
