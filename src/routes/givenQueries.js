const express = require('express')
const router = express.Router()

const mongoose = require('../models')

router.get('/choirsFromTown/:town', async function(req, res) {
  const members = await mongoose.models.Member.getChoirBasedOnMembersHometown(
    req.params.town
  )
  const choirs = members.map(member => member.choir)

  let allChoirs = []
  choirs.forEach(choirList => {
    choirList.forEach(choir => {
      allChoirs.push(choir)
    })
  })

  const choirNames = [...new Set(allChoirs.map(choir => choir.choirName))]

  res.send(choirNames)
})

router.get(
  '/membersAvailableInCity/:town/withVocalRange/:range',
  async function(req, res) {
    const members = await mongoose.models.Member.getChoirBasedOnMembersHometownAndVocalrange(
      req.params.town,
      req.params.range
    )

    res.send(members)
  }
)

module.exports = router
