const Base = require('./base')

module.exports = class extends Base {
  indexAction () {

  }

  loginAction () {
    this.rules = {
      username: { required: true },
      password: { required: true }
    }
  }

  registerAction () {
    this.rules = {
      username: { required: true },
      password: { required: true }
    }
  }
}
