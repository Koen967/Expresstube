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

router.get(
  '/:ownerName',
  async function(req, res) {
    const playlists = await mongoose.models.Playlist.getPlaylistsByOwner(
      req.params.ownerName
    )

    console.log(playlists)

    res.send(playlists)
  }
)

router.get('/:ownerName/:playlistName', async function(req, res) {
    const playlists = await mongoose.models.Playlist.getPlaylist(
      req.params.ownerName,
      req.params.playlistName
    )
  
    res.send(playlists)
  })

  router.post('/:ownerName/:playlistName', async function(req, res) {
    let playlist = await mongoose.models.Playlist.addPlaylist(req.params.ownerName, req.params.playlistName)

    res.send(playlist)
})

router.put('/:ownerName/:playlistName', async function(req, res) {
    let playlist = await mongoose.models.Playlist.updatePlaylistName(req.params.ownerName, req.params.playlistName, req.body.newPlaylistName)

    res.send(playlist)
})

router.delete('/:ownerName/:playlistName', async function(req, res) {
    await mongoose.models.Playlist.deletePlaylist(req.params.ownerName, req.params.playlistName)

    res.send("playlist deleted")
})

router.get('/:ownerName/:playlistName/songs', async function(req, res) {
    let playlist = await mongoose.models.Playlist.getPlaylist(req.params.ownerName, req.params.playlistName)

    res.send(playlist.tracks)
})

router.put('/:ownerName/:playlistName/songs', async function(req, res) {
    let track = await mongoose.models.Track.getTrack(req.body.title, req.body.performer)
    if (!track) {
        return res.status(404).send("Track not found")
    }
    let playlist = await mongoose.models.Playlist.addTrackToPlaylist(req.params.ownerName, req.params.playlistName, track)

    res.send(playlist)
})

module.exports = router
