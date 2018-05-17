module.exports = class extends think.Service {
  // 废弃，逻辑搬到logic -> __before
  // 更新：逻辑搬到middleware
  async token () {
    const token = await this.ctx.session('token')
    if (!token) this.ctx.throw(401, 'token无效')
    const { _id } = token
    const userInfo = await this.model('user').findById(_id)
    if (!userInfo) this.ctx.throw(401, '会话过期')
    this.ctx.state.user = userInfo
  }
}
