const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('./src/models')

const app = express()

const playlists = require('./src/routes/playlist')
const tracks = require('./src/routes/track')

app.use(cors())
app.use(bodyParser.json())

app.use('/playlists', playlists)
app.use('/tracks', tracks)

const eraseDatabaseOnSync = true

mongoose.connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      mongoose.models.Track.deleteMany({}),
      mongoose.models.Playlist.deleteMany({}),
    ])

    createTracks()
  }
  app.listen(3000, () => console.log(`Example app listening on port 3000!`))
})

const createTracks = async () => {
  const song1 = new mongoose.models.Track({
    performer: 'Muse',
    title: 'Super massive',
    url: 'www.youtube.com/museSuper',
    duration: 234,
    album: 'Origin'
  })
  const song2 = new mongoose.models.Track({
    performer: 'Dire straits',
    title: 'Brother in arms',
    url: 'www.youtube.com/Bro',
    duration: 222,
    album: 'Bestof'
  })
  const song3 = new mongoose.models.Track({
    performer: 'Lone',
    title: 'Caraba',
    url: 'www.youtube.com/LoneCa',
    duration: 35,
    album: 'Shorty'
  })
  const song4 = new mongoose.models.Track({
    performer: 'Beans',
    title: 'Machine',
    url: 'www.youtube.com/Machina',
    duration: 165,
    album: 'Fartulous'
  })
  const song5 = new mongoose.models.Track({
    performer: 'Mole',
    title: 'Crawling',
    url: 'www.spot.com/mole1',
    duration: 240,
    playCount: 4,
    publicationDate: new Date('1995-08-15T03:24:00'),
    description: 'Crawlies by the Moles'
  })
  
  await song1.save()
  await song2.save()
  await song3.save()
  await song4.save()
  await song5.save()

  const playlist1 = new mongoose.models.Playlist({
    ownerName: 'Koen',
    playlistName: 'temop',
    tracks: [{...song1._doc, offlineAvailable: true}, {...song3._doc, offlineAvailable: true}, {...song5._doc, offlineAvailable: false}]
  })

  await playlist1.save()
}
