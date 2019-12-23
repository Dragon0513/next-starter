import React from 'react'
import styled from 'styled-components'
import Typography from 'COMPONENTS/base/Typography'
import Empty from 'COMPONENTS/base/Empty'
import withRoot from './withRoot'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const getBuildTime: () => string = () => {
  const buildTime = process.env.BUILD_TIME
  if (buildTime) {
    const time = new Date(buildTime)
    return `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDay()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  }
  return 'Unknow'
}

const VersionInfo: React.FC = () => {
  const config = [
    {
      title: 'NPM VERSION',
      value: process.env.npm_package_version
    },
    {
      title: 'NODE ENV',
      value: process.env.NODE_ENV
    },
    {
      title: 'BUILD ENV',
      value: process.env.BUILD_ENV
    },
    {
      title: 'BUILD TIME',
      value: getBuildTime()
    },
    {
      title: 'GIT COMMIT ID',
      value: process.env.npm_package_gitHead || 'unknown'
    },
    {
      title: 'REACT VERSION',
      value: process.env.npm_package_dependencies_react
    }
  ]

  return (
    <Container>
      <Empty height='6rem' />
      <table>
        <tbody>
          {config.map((item, index) => (
            <tr key={index}>
              <td>
                <Typography align='right'>{item.title}：</Typography>
              </td>
              <td>
                <Typography>{item.value}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default withRoot(VersionInfo)
