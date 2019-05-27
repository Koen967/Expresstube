const mongoose = require('mongoose')

const Member = require('./member').Member
const Concert = require('./concert').Concert
const Work = require('./work').Work

const connectDb = () => {
  return mongoose.connect(`mongodb://localhost:27017/AmateurMusicians`, {
    useNewUrlParser: true
  })
}

const models = { Member, Concert, Work }

module.exports = { connectDb, models }
