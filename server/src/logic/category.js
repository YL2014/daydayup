const Base = require('./base')

module.exports = class extends Base {
  async createAction () {
    this.rules = {
      name: { required: true }
    }
  }

  async updateAction () {
    this.rules = {
      _id: { required: true }
    }
  }

  async removeAction () {
    this.rules = {
      _id: { required: true }
    }
  }
}
