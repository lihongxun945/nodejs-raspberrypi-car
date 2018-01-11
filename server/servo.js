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
    this.rotate()
  }

  // forward: 1.23
  // 0.5 right
  // 2.15 left
  rotate (time) {
    const interval = timer.setInterval(() => {
      rpio.write(pin, 1)
      timer.setTimeout(() => {
        rpio.write(pin, 0)
      }, '', '2.15m')
    }, '', '20m')
    setTimeout(() => {
      console.log('clear')
      timer.clearInterval()
    }, 500)
  }

  left () {
    this.rotate('2.15m')
  }

  right () {
    this.rotate('0.5m')
  }

  reset () {
    this.rotate('1.23m')
  }
}

module.exports = new Servo()
