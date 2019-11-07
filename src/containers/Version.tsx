import moment from 'moment'
import React from 'react'

import Typography from 'COMPONENTS/base/Typography'

const getBuildTime: () => string = () => {
  const buildTime = process.env.BUILD_TIME
  if (buildTime) {
    return moment(new Date(buildTime)).format('YYYY-MM-DD HH:MM')
  }
  return 'Unknow'
}

const VersionInfo: React.FC = () => {
  const time = getBuildTime()

  return (
    <div>
      version: {process.env.npm_package_version}
      <Typography>{time}</Typography>
      <Typography>git: {process.env.npm_package_gitHead}</Typography>
    </div>
  )
}

export default VersionInfo
