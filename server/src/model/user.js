const bcrypt = require('bcrypt-nodejs')

module.exports = class extends think.Mongoose {
  get schema () {
    const schema = new think.Mongoose.Schema({
      username: { type: String, unique: true },
      password: { type: String, default: '' },
      status: { type: Number, default: 0 } // 0 未审核  1 已审核  防止系统被注入
    })

    schema.pre('save', function (cb) {
      this.password = bcrypt.hashSync(this.password)
      cb()
    })

    schema.methods.verifyPassword = function (password) {
      return bcrypt.compareSync(password, this.password)
    }

    return schema
  }
}
