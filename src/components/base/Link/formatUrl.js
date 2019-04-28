import parse from 'url-parse'

const formatUrl = (href, { target, staticSuffix, host }) => {
  let unifyHref = href || '/'
  let res = {
    nextHref: '',
    nextAs: '',
    aHref: '',
    next: false
  }

  if (href && href.pathname) {
    unifyHref = href.pathname
  }

  // 站外链接
  if (!unifyHref.match(/^\/[^/]/) && unifyHref !== '/') {
    res.aHref = unifyHref

    return res
  }

  const parseUrl = parse(unifyHref)
  const { pathname, query } = parseUrl
  res.nextHref = pathname

  if (res.nextHref.match(/\/$/)) {
    res.nextAs = `${res.nextHref}index${staticSuffix}${query}`
    res.aHref = res.nextAs
  } else {
    res.nextAs = `${res.nextHref}${staticSuffix}${query}`
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
