const Base = require('./base')

module.exports = class extends Base {
  createAction () {
    this.rules = {
      title: { required: true },
      content: { required: true },
      category: { required: true, array: true }
    }
  }

  updateAction () {
    this.rules = {
      _id: { required: true }
    }
  }

  removeAction () {
    this.rules = {
      _id: { required: true }
    }
  }

  detailAction () {
    this.rules = {
      _id: { required: true }
    }
  }

  listAction () {
    this.rules = {
      pageIndex: { default: 0 },
      pageSize: { default: 10 }
    }
  }
}
