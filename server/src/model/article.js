module.exports = class extends think.Mongoose {
  get schema () {
    return new think.Mongoose.Schema({
      title: { type: String },
      content: { type: String },
      description: { type: String }, // 描述，取content的前50个字
      category: [{ type: think.Mongoose.Schema.Types.ObjectId, ref: 'category' }],
      tag: [{ type: think.Mongoose.Schema.Types.ObjectId, ref: 'tag' }]
      // user: { type: think.Mongoose.Schema.Types.ObjectId, ref: 'user' }
    }, { timestamps: true })
  }
}
