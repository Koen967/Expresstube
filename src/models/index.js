const mongoose = require('mongoose')

const Playlist = require('./playlist').Playlist
const Track = require('./track').Track

const connectDb = () => {
  return mongoose.connect(`mongodb://localhost:27017/Spotitube`, {
    useNewUrlParser: true
  })
}

const models = { Playlist, Track }

module.exports = { connectDb, models }
