import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import env from 'ENV'
import parse from 'url-parse'
import { not } from 'UTILS/theme'

const { host, target: exportTarget } = env

const StyledLink = styled(({ color, decoration, ...other }) => (
  <a {...other} />
))`
  color: ${props => props.color};
  ${not('decoration')(`
    text-decoration: none;
  `)}
`

function Link (props) {
  const { className, href, children, decoration, color, target, ...other } = props

  let unifyHref = href || '/'
  let res = {
    nextHref: '',
    nextAs: '',
    aHref: ''
  }

  if (href && href.pathname) {
    unifyHref = href.pathname
  }

  // 站外链接
  if (!unifyHref.match(/^\/[^/]/)) {
    return (
      <StyledLink
        target={target}
        color={color}
        href={unifyHref}
        decoration={decoration}
        className={className}
      >
        {children}
      </StyledLink>
    )
  }

  const url = parse(unifyHref)
  const { pathname, query } = url
  res.nextHref = pathname

  if (res.nextHref.match(/\/$/)) {
    res.nextAs = `${res.nextHref}index.html${query}`
    res.aHref = res.nextAs
  } else {
    res.nextAs = `${res.nextHref}.html${query}`
    res.aHref = res.nextAs
  }

  // 代码导出绝对链接
  if (exportTarget !== 'inner') {
    const absoluteHref = `//${host}${res.aHref}`

    return (
      <StyledLink
        target={target}
        color={color}
        href={absoluteHref}
        decoration={decoration}
        className={className}
      >
        {children}
      </StyledLink>
    )
  }

  return (
    <NextLink
      href={res.nextHref}
      as={res.nextAs}
      {...other}
    >
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
