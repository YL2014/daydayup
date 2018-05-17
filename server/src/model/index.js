module.exports = class extends think.Mongoose {
  get schema () {
    return {
      name: String
    }
  }
}
