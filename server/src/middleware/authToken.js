module.exports = (options, app) => {
  return async (ctx, next) => {
    const token = await ctx.session('token')
    if (!token) ctx.throw(401, '会话过期')
    const { _id } = token
    // @TODO 这里使用ctx.model('user')会导致controller里获取的model实例都是user，待查
    const userInfo = await ctx.mongoose('user').findById(_id)
    if (!userInfo) ctx.throw(401, 'token无效')
    ctx.state.user = userInfo
    return next()
  }
}
