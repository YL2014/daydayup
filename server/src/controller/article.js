const Base = require('./base.js')

module.exports = class extends Base {
  async createAction () {
    const { title, content, category } = this.ctx.post()
    const description = content.slice(0, 50)
    await this.mongoose('article').create({
      title, content, description, category
    })
    this.success()
  }

  async listAction () {
    const { pageSize, pageIndex, title, dateMonth, category } = this.ctx.param()
    const queryConditions = {}
    // 支持标题模糊查询
    if (title) {
      const reg = new RegExp(title)
      queryConditions.title = { $regex: reg }
      // queryConditions.content = { $regex: reg } // ? 是否也需要在内容里查找关键词
    }
    // 为归档提供年月查询
    if (dateMonth) {
      const reg = new RegExp(dateMonth)
      queryConditions.createdAt = { $regex: reg }
    }
    if (category) queryConditions.category = category
    const data = await this.mongoose('article').find(
      queryConditions,
      '_id title description created'
    ).skip(pageIndex * pageSize).limit(pageSize)
    this.success(data)
  }

  async updateAction () {
    const { _id, title, content, category } = this.ctx.post()
    const description = content.slice(0, 50)
    await this.mongoose('article').findOneAndUpdate(
      { _id },
      { title, content, description, category }
    )
    this.success()
  }

  async removeAction () {
    const { _id } = this.ctx.param()
    await this.mongoose('article').remove({ _id })
    this.success()
  }

  async detailAction () {
    const { _id } = this.ctx.param()
    const data = await this.mongoose('article').findById(_id).populate('category')
    this.success(data)
  }
}
