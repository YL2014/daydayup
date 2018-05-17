module.exports = class extends think.Logic {
  async __before () {
    // 逻辑搬到middleware
    /* const currentPath = this.ctx.path
    // 需要token验证的route
    const authPaths = [
      '/category/create',
      '/category/update',
      '/category/remove'
    ]

    if (authPaths.indexOf(currentPath) >= 0) {
      // session 在service里咩有注入，需要绑定this
      // await this.service('auth').token.call(this)
      const token = await this.ctx.session('token')
      if (!token) this.ctx.throw(401, 'token无效')
      const { _id } = token
      // @TODO 这里使用this.model('user')会导致controller里获取的model实例都是user，待查
      const userInfo = await this.mongoose('user').findById(_id)
      if (!userInfo) this.ctx.throw(401, '会话过期')
      this.ctx.state.user = userInfo
    } */
  }
}
