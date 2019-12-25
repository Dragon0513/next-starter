import env from 'CONFIG/env'
import { check, fp } from 'UTILS/theme'
import NextLink from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { StandardProps } from '@material-ui/core'
import MuiLink, {
  LinkProps as MuiLinkProps,
  LinkClassKey as MuiLinkClassKey
} from '@material-ui/core/Link'

import routers from 'CONFIG/routers'
import formatUrl from './formatUrl'

export interface LinkProps
  extends StandardProps<MuiLinkProps, MuiLinkClassKey> {
  withoutLineHeight?: boolean
}

const MyLink = (props: LinkProps, ref: React.Ref<HTMLAnchorElement>) => (
  <MuiLink {...fp(props, ['withoutLineHeight'])} ref={ref} />
)

const StyledLink = styled(React.forwardRef(MyLink))`
  ${check<LinkProps, keyof LinkProps>('withoutLineHeight')(`
    line-height: 1;
  `)}
`

const { host, target: exportTarget, staticSuffix } = env

const Link: React.ComponentType<LinkProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLAnchorElement>) => {
    const { href, children, ...other } = props

    const res = formatUrl(href, {
      host,
      target: exportTarget,
      staticSuffix,
      routers
    })

    if (!res.next) {
      return (
        <StyledLink href={res.aHref} {...other} ref={ref}>
          {children}
        </StyledLink>
      )
    }

    return (
      <NextLink href={res.nextHref} as={res.nextAs}>
        <StyledLink href={res.aHref} {...other} ref={ref}>
          {children}
        </StyledLink>
      </NextLink>
    )
  }
)

export default Link
