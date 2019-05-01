const ALY = require('aliyun-sdk')
const config = require('../env')

const g = (key, defaultValue) => process.env[key] || defaultValue || ''

const cdn = new ALY.CDN({
  accessKeyId: g('ALI_ACCESS_ID'),
  secretAccessKey: g('ALI_ACCESS_KEY'),
  endpoint: 'https://cdn.aliyuncs.com',
  apiVersion: '2014-11-11'
})

const refreshObjectCaches = () => (new Promise((resolve, reject) => {
  if (!config.oss.refresh) {
    resolve()
  }

  cdn.refreshObjectCaches({
    ObjectType: 'Directory',
    ObjectPath: `https://${config.host}/ \n http://${config.host}/`
  }, (err, res) => {
    if (err) {
      reject(err)
    }
    resolve(res)
  })
}))

module.exports = refreshObjectCaches
