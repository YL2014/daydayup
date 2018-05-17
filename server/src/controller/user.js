const Base = require('./base.js')

module.exports = class extends Base {
  indexAction () {
    return this.display()
  }

  async loginAction () {
    const { username, password } = this.ctx.post()
    const UserModel = this.mongoose('user')
    const user = await UserModel.findOne({ username })
    if (!user) {
      this.ctx.throw(400, '用户名不存在')
    }
    if (Number(user.status) !== 1) {
      this.ctx.throw(400, '无权访问，请联系管理员')
    }
    const isMatch = await user.verifyPassword(password)
    if (!isMatch) {
      this.ctx.throw(400, '密码错误')
    }
    const { _id } = user
    const token = await this.session('token', { username, _id })
    this.ctx.success({ token, username, _id })
  }

  async registerAction () {
    const { username, password } = this.ctx.post()
    const UserModel = this.mongoose('user')
    const checkExitUser = await UserModel.findOne({ username })
    if (checkExitUser) this.ctx.throw(400, '用户名已存在')
    const user = await UserModel.create({
      username, password
    })
    const { _id } = user
    const token = await this.session('token', { username, _id })
    // const token = await this.session('token')
    this.ctx.success({ token, username, _id })
  }
}
