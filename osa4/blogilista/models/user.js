const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  name: {
    type: String,
    unique: true
  }
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User