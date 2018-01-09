const express = require('express')
const captain = require('./captain.js')

const router = express.Router()

router.get('/api/start', (req, res) => {
  res.send(captain.start())
})

router.get('/api/stop', (req, res) => {
  res.send(captain.stop())
})

module.exports = router
