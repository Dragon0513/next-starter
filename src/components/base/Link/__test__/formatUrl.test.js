import formatUrl from '../formatUrl'

const routers = {
  '/index': { page: '/index' },
  '/api': { page: '/apiPage' }
}

it('', () => {
  const res = formatUrl('//www.shianqi.com', {
    target: 'inner',
    staticSuffix: '.html',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '',
    nextAs: '',
    aHref: '//www.shianqi.com',
    next: false
  })
})

it('', () => {
  const res = formatUrl('/', {
    target: 'inner',
    staticSuffix: '.html',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/',
    nextAs: '/index.html',
    aHref: '/index.html',
    next: true
  })
})

it('', () => {
  const res = formatUrl('/', {
    target: 'inner',
    staticSuffix: '',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/',
    nextAs: '/',
    aHref: '/',
    next: true
  })
})

it('', () => {
  const res = formatUrl(null, {
    target: 'inner',
    staticSuffix: '.html',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/',
    nextAs: '/index.html',
    aHref: '/index.html',
    next: true
  })
})

it('', () => {
  const res = formatUrl('/?id=0', {
    target: 'inner',
    staticSuffix: '.html',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/',
    nextAs: '/index.html?id=0',
    aHref: '/index.html?id=0',
    next: true
  })
})

it('', () => {
  const res = formatUrl(
    { pathname: '/a?id=0' },
    {
      target: 'inner',
      staticSuffix: '.html',
      host: 'www.shianqi.com',
      routers
    }
  )

  expect(res).toEqual({
    nextHref: '/a',
    nextAs: '/a.html?id=0',
    aHref: '/a.html?id=0',
    next: true
  })
})

it('should process outer use code', () => {
  const res = formatUrl('/a?id=0', {
    target: 'outer',
    staticSuffix: '.html',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/a',
    nextAs: '/a.html?id=0',
    aHref: '//www.shianqi.com/a.html?id=0',
    next: false
  })
})

it('', () => {
  const res = formatUrl('/a?id=0', {
    target: 'inner',
    staticSuffix: '',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/a',
    nextAs: '/a?id=0',
    aHref: '/a?id=0',
    next: true
  })
})

it('', () => {
  const res = formatUrl('/api?id=0', {
    target: 'inner',
    staticSuffix: '',
    host: 'www.shianqi.com',
    routers
  })

  expect(res).toEqual({
    nextHref: '/apiPage',
    nextAs: '/api?id=0',
    aHref: '/api?id=0',
    next: true
  })
})
