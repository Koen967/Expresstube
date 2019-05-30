const express = require('express')
const router = express.Router()

const mongoose = require('../models')

router.get(
    '/',
    async function(req, res) {
      const playlists = await mongoose.models.Playlist.getPlaylists()
  
      res.send(playlists)
    }
  )

router.get('/:ownerName/:playlistName', async function(req, res) {
    const playlist = await mongoose.models.Playlist.getPlaylist(req.params.ownerName, req.params.playlistName)
    const tracks = await mongoose.models.Track.getTracksNotInPlaylist(playlist, req.query.filter)

    res.send(tracks)
  })

router.put('/:ownerName/:playlistName', async function(req, res) {
    let playlist = await mongoose.models.Playlist.updatePlaylistName(req.params.ownerName, req.params.playlistName, req.body.newPlaylistName)

    res.send(playlist)
})

router.put('/:ownerName/:playlistName/songs', async function(req, res) {
    let playlist = await mongoose.models.Playlist.addTrackToPlaylist(req.params.ownerName, req.params.playlistName, req.body.newPlaylistName)

    res.send(playlist)
})

module.exports = router
