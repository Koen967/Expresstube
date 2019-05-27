const mongoose = require('mongoose')

const workSchema = require('./work').workSchema

const memberSchema = new mongoose.Schema({
  memberNo: {
    type: Number,
    required: true,
    min: 0,
    unique: true
  },
  rangeName: {
    type: String
  },
  townName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: true
  },
  homeHouseNo: {
    type: Number,
    required: true,
    min: 1
  },
  email: {
    type: String,
    required: true
  },
  cellPhone: {
    type: Number
  },
  landline: {
    type: Number
  },
  choir: [
    {
      choirName: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true,
        enum: ['CONDUCTOR', 'MEMBER']
      }
    }
  ],
  conductorForWork: [workSchema]
})

memberSchema.statics.getChoirBasedOnMembersHometown = async function(town) {
  let members = await this.find({ townName: town })

  return members
}

memberSchema.statics.getChoirBasedOnMembersHometownAndVocalrange = async function(
  town,
  range
) {
  let members = await this.find({ townName: town, rangeName: range })

  return members
}

const Member = mongoose.model('Member', memberSchema)

module.exports = { Member, memberSchema }
