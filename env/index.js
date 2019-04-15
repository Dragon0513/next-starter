const _ = require('lodash')
const common = require('./env/base')
const env = process.env.BUILD_ENV || 'development'
const config = require(`./env/${env}`)

module.exports = _.merge(common, config, { env })
