const Base = require('./base.js')

module.exports = class extends Base {
  indexAction () {
    return this.display()
  }

  async createAction () {
    const { name } = this.ctx.post()
    await this.mongoose('category').create({ name })
    await this.listAction()
  }

  async listAction () {
    const data = await this.mongoose('category').find({}, '_id name')
    this.success(data)
  }

  async removeAction () {
    const { _id } = this.ctx.param()
    // 获取包含该id的articles
    let articles = await this.mongoose('article').find({ category: _id })
    // 遍历并删除其对应categoryId
    await Promise.map(articles, async (item) => {
      const cates = item.category
      const removeItemIndex = cates.indexOf(_id)
      item.category = cates.splice(removeItemIndex, 1)
      await item.save()
    })
    // 删除categoryId
    await this.mongoose('category').remove({ _id })
    // 返回列表
    await this.listAction()
  }

  async updateAction () {
    const { _id, name } = this.ctx.post()
    await this.mongoose('category').findOneAndUpdate({ _id }, { name }, { new: true })
    await this.listAction()
  }
}
