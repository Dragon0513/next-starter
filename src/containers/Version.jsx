import moment from 'moment'
import React from 'react'

import { Typography } from '@material-ui/core'

function VersionInfo () {
  const buildTime = process.env.BUILD_TIME
  const time = moment(new Date(buildTime)).format('YYYY-MM-DD HH:MM')

  return (
    <div>
      version: {process.env.npm_package_version}
      <Typography>{time}</Typography>
      <Typography>git: {process.env.npm_package_gitHead}</Typography>
    </div>
  )
}

export default VersionInfo
