const rpio = require('rpio')
const NanoTimer = require('nanotimer') //

const timer = new NanoTimer()

const pin = 36

class Servo {
  constructor() {
    this.direction = 0 // -1 left, 0 forward, 1 right
    this.init()
  }

  init () {
    rpio.open(pin, rpio.OUTPUT)
    this.reset()
  }

  // forward: 1.23
  // 0.5 right
  // 2.15 left
  rotate (time, cb) {
    const interval = timer.setInterval(() => {
      rpio.write(pin, 1)
      timer.setTimeout(() => {
        rpio.write(pin, 0)
      }, '', time)
    }, '', '20m')
    setTimeout(() => {
      console.log('servo clear')
      timer.clearInterval()
      cb && cb()
    }, 1000)
  }

  left (cb) {
    this.rotate('2.15m', cb)
  }

  right (cb) {
    this.rotate('0.5m', cb)
  }

  reset (cb) {
    this.rotate('1.28m', cb)
  }
}

module.exports = new Servo()
