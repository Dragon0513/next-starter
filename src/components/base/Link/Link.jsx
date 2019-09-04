import env from 'ENV'
import { not } from 'UTILS/theme'
import NextLink from 'next/link'
import React from 'react'
import styled from 'styled-components'

import formatUrl from './formatUrl'

const { host, target: exportTarget, staticSuffix } = env

const StyledLink = styled(({ color, decoration, ...other }) => (
  <a {...other} />
))`
  color: ${props => props.color};
  ${not('decoration')(`
    text-decoration: none;
  `)}
`

function Link(props) {
  const {
    className,
    href,
    children,
    decoration,
    color,
    target,
    ...other
  } = props

  const res = formatUrl(href, {
    host,
    target: exportTarget,
    staticSuffix
  })

  if (!res.next) {
    return (
      <StyledLink
        target={target}
        color={color}
        href={res.aHref}
        decoration={decoration}
        className={className}
      >
        {children}
      </StyledLink>
    )
  }

  return (
    <NextLink href={res.nextHref} as={res.nextAs} {...other}>
      <StyledLink
        target={target}
        color={color}
        href={res.aHref}
        decoration={decoration}
        className={className}
      >
        {children}
      </StyledLink>
    </NextLink>
  )
}

export default Link
