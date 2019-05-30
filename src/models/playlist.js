const mongoose = require('mongoose')

const trackSchema = require('./track').trackSchema

const playlistSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    playlistName: {
        type: String,
        required: true
    },
    tracks: [
        trackSchema
    ]
})

playlistSchema.statics.getPlaylists = async function () {
    let playlists = await this.find({})

    return playlists
}

playlistSchema.statics.addPlaylist = async function (ownerName, playlistName) {
    const playlist = new mongoose.models.Playlist({
        ownerName: ownerName,
        playlistName: playlistName,
        tracks: []
    })

    await playlist.save()
    return playlist
}

playlistSchema.statics.deletePlaylist = async function (ownerName, playlistName) {
    return await this.deleteOne({ownerName: ownerName, playlistName, playlistName})
}

playlistSchema.statics.getPlaylistsByOwner = async function (ownerName) {
    let playlists = await this.find({ ownerName: ownerName })

    return playlists
}

playlistSchema.statics.getPlaylist = async function (ownerName, playlistName) {
    return await this.findOne({ ownerName: ownerName, playlistName: playlistName })
}

playlistSchema.statics.updatePlaylistName = async function (ownerName, playlistName, newName) {
    let playlist = await this.findOne({ ownerName: ownerName, playlistName: playlistName })
    playlist.playlistName = newName

    await playlist.save()
    return playlist
}

playlistSchema.statics.addTrackToPlaylist = async function (ownerName, playlistName, track) {
    let playlist = await this.findOne({ ownerName: ownerName, playlistName: playlistName })
    track.offlineAvailable = false
    playlist.tracks.push(track)

    await playlist.save()
    return playlist
}

playlistSchema.statics.getChoirBasedOnMembersHometownAndVocalrange = async function (
    town,
    range
) {
    let members = await this.find({ townName: town, rangeName: range })

    return members
}

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = { Playlist: Playlist, playlistSchema: playlistSchema }
