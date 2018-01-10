const express = require('express')
const driver = require('./driver.js')
const SR = require('./sr.js')

const captain = require('./captain.js')

const router = express.Router()

router.get('/api/go/:dir', (req, res) => {
  const dir = parseInt(req.params.dir)
  console.log(`dir: ${dir}`)
  driver.go(dir)
  res.send('OK')
})

module.exports = router
