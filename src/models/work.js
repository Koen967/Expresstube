const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
  surName: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: true
  },
  yearBorn: {
    type: Number,
    required: true
  },
  yearDied: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  opusNumber: {
    type: Number
  },
  vocalRange: [
    {
      rangeName: {
        type: String,
        required: true
      },
      vocRangeNumRequired: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ]
})

const Work = mongoose.model('Work', workSchema)

module.exports = { Work, workSchema }
