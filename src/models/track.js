const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    performer: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    // Song
    album: {
        type: String,
    },
    // Video
    playCount: {
        type: Number,
    },
    publicationDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    offlineAvailable:{ 
        type: Boolean
    }
})

trackSchema.statics.getTrack = async function(title, performer) {
    return this.findOne({performer: performer, title: title})
}

trackSchema.statics.getTracksNotInPlaylist = async function(playlist, filter) {
    let tracks = await this.find({})
    let trackIdsInPlaylist = []
    playlist.tracks.map(track => {
        trackIdsInPlaylist.push(track._id.toString())
    })
    let tracksNotInPlaylist = tracks.filter(track => !trackIdsInPlaylist.includes(track._id.toString()))
    if (filter) {
        tracksNotInPlaylist = tracksNotInPlaylist.filter(track => track.title.includes(filter))
    }

    return tracksNotInPlaylist
}

const Track = mongoose.model('Track', trackSchema)

module.exports = { Track: Track, trackSchema: trackSchema }
