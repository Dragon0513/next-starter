import parse from 'url-parse'
import { Routers } from 'CONFIG/routers'

interface FormatUrlOption {
  target: string
  staticSuffix: string
  host: string
  routers: Routers
}

const formatUrl: (
  href: string | undefined,
  option: FormatUrlOption
) => {
  nextHref: string
  nextAs: string
  aHref: string
  next: boolean
} = (href, { target, staticSuffix, host, routers }) => {
  const unifyHref = href || '/'
  const res = {
    nextHref: '',
    nextAs: '',
    aHref: '',
    next: false
  }

  // 站外链接
  if (!unifyHref.match(/^\/[^/]/) && unifyHref !== '/') {
    res.aHref = unifyHref

    return res
  }

  const parseUrl = parse(unifyHref)
  const { pathname, query } = parseUrl

  if (routers[pathname] != null) {
    res.nextHref = routers[pathname].page
  } else {
    res.nextHref = pathname
  }

  if (res.nextHref.match(/\/$/)) {
    res.nextAs = `${pathname}${
      staticSuffix === '' ? '' : `index${staticSuffix}`
    }${query}`
    res.aHref = res.nextAs
  } else {
    res.nextAs = `${pathname}${staticSuffix}${query}`
    res.aHref = res.nextAs
  }

  // 代码导出绝对链接
  if (target !== 'inner') {
    res.aHref = `//${host}${res.aHref}`

    return res
  }

  res.next = true
  return res
}

export default formatUrl
