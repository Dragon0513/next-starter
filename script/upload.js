const env = require('../config/env')
const path = require('path')
const OssCdnHelper = require('oss-cdn-helper').default

const { service, host } = env
const { oss } = service

const process = async () => {
  const uploadFiles = await OssCdnHelper.upload({
    uploadPath: path.resolve(__dirname, '../out'),
    targetPath: '',
    region: oss.bucket,
    bucket: oss.region,
    removeHtmlSuffix: true,
    removeHtmlSuffixIgnore: ['/index.html'],
    cleanTargetPath: false
  })

  const paths = [`http://${host}/`, `https://${host}/`]
  const files = uploadFiles
    .filter(file => file.filePath.match(/.html$/))
    .map(
      file => `http://${host}${file.fileName} \nhttps://${host}${file.fileName}`
    )

  await OssCdnHelper.refresh({
    enabled: false,
    log: true,
    paths,
    files
  })
}

process()
