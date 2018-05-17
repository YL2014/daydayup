const path = require('path')
const isDev = think.env === 'development'

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    // enable: !think.isCli,
    options: {
      debug: isDev,
      error (err, ctx) {
        console.log(err)
        return ctx.fail(err.message || err)
      }
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller',
  {
    handle: 'authToken',
    options: {},
    match: [
      '/category/create',
      '/category/update',
      '/category/remove',
      '/article/create',
      '/article/update',
      '/article/remove'
    ]
  }
]
