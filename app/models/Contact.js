const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return validator.isEmail(email)
      },
      message: function () {
        return 'Enter correct email'
      }
    }
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    validate: {
      validator: function (mobile) {
        return validator.isNumeric(mobile)
      },
      message: function () {
        return 'Mobile should be number'
      }
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact