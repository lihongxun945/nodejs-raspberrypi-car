const express = require('express')
const driver = require('./driver.js')

const captain = require('./captain.js')

const router = express.Router()

// 手动控制
router.get('/api/go/:dir', (req, res) => {
  const dir = parseInt(req.params.dir)
  console.log(`dir: ${dir}`)
  driver.go(dir)
  res.send('OK')
})

router.get('/api/auto/start', (req, res) => {
  captain.start()
  res.send('OK')
})

router.get('/api/auto/stop', (req, res) => {
  captain.stop()
  res.send('OK')
})

router.get('/api/set/speed/:speed', (req, res) => {
  driver.setSpeed(parseInt(req.params.speed))
  res.send('OK')
})

router.get('/api/get/speed/', (req, res) => {
  res.send({
    speed: driver.speed
  })
})

module.exports = router
