import env from 'ENV'
import { check } from 'UTILS/theme'
import NextLink from 'next/link'
import React from 'react'
import styled from 'styled-components'

import MuiLink from '@material-ui/core/Link'
import routers from 'CONFIG/routers'

import formatUrl from './formatUrl'

const StyledLink = styled(({ withoutLineHeight, ...props }) => (
  <MuiLink {...props} />
))`
  ${check('withoutLineHeight')(`
    line-height: 1;
  `)}
`

const { host, target: exportTarget, staticSuffix } = env

function Link(props) {
  const { href, children, ...other } = props

  const res = formatUrl(href, {
    host,
    target: exportTarget,
    staticSuffix,
    routers
  })

  if (!res.next) {
    return (
      <StyledLink href={res.aHref} {...other}>
        {children}
      </StyledLink>
    )
  }

  return (
    <NextLink href={res.nextHref} as={res.nextAs}>
      <StyledLink href={res.aHref} {...other}>
        {children}
      </StyledLink>
    </NextLink>
  )
}

export default Link
