const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const env = require('env')

const { port } = env
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const redirects = [
  // { from: '/', to: '/'}
]

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    router[method](from, async ctx => {
      await app.render(ctx.req, ctx.res, to, ctx.query)
      ctx.respond = false
    })
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
