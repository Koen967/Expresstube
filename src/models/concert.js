const mongoose = require('mongoose')

const workSchema = require('./work').workSchema
const memberSchema = require('./member').memberSchema

const concertSchema = new mongoose.Schema({
  performanceDate: {
    type: Date,
    required: true
  },
  choirName: {
    type: String
  },
  townName: {
    type: String,
    required: true
  },
  venueName: {
    type: String,
    required: true
  },
  performanceTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  program: [
    {
      seqNo: {
        type: Number,
        required: true,
        min: 0
      },
      workSchema
    }
  ],
  members: [memberSchema]
})

concertSchema.statics.getConcertByTown = async function(town) {
  let concerts = await this.find({ townName: town })

  return concerts
}

const Concert = mongoose.model('Concert', concertSchema)

module.exports = { Concert, concertSchema }
