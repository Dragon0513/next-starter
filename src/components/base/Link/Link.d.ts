import * as React from 'react'
import { StandardProps } from '@material-ui/core'
import {
  LinkProps as MuiLinkProps,
  LinkClassKey as MuiLinkClassKey
} from '@material-ui/core/Link'

export interface LinkProps extends StandardProps<MuiLinkProps, MuiLinkClassKey> {
  link?: string
}

declare const Link: React.ComponentType<LinkProps>

export default Link
