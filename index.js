const express = require('express')
const cors = require('cors')

const mongoose = require('./src/models')

const app = express()

const givenQueries = require('./src/routes/givenQueries')

app.use(cors())

app.use('/given', givenQueries)

const eraseDatabaseOnSync = true

mongoose.connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      mongoose.models.Member.deleteMany({}),
      mongoose.models.Concert.deleteMany({}),
      mongoose.models.Work.deleteMany({})
    ])

    createMembers()
  }
  app.listen(3000, () => console.log(`Example app listening on port 3000!`))
})

const createMembers = async () => {
  const member1 = new mongoose.models.Member({
    memberNo: 1,
    rangeName: 'Hoog',
    townName: 'Uden',
    surname: 'Helvoort',
    initials: 'KWJ',
    homeHouseNo: 18,
    email: 'K@h.c',
    choir: [
      {
        choirName: 'BZB',
        role: 'MEMBER'
      }
    ]
  })

  const member2 = new mongoose.models.Member({
    memberNo: 2,
    rangeName: 'Hoog',
    townName: 'Uden',
    surname: 'Fransen',
    initials: 'AL',
    homeHouseNo: 85,
    email: 'K@h.c',
    choir: [
      {
        choirName: 'BLOG',
        role: 'MEMBER'
      },
      {
        choirName: 'BZB',
        role: 'CONDUCTOR'
      }
    ]
  })

  await member1.save()
  await member2.save()
}
