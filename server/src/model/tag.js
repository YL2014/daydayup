module.exports = class extends think.Mongoose {
  get schema () {
    return new think.Mongoose.Schema({
      name: { type: String }
      // user: { type: think.Mongoose.Schema.Types.ObjectId, ref: 'user' }
    }, { timestamps: true })
  }
}
