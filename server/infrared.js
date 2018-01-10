const rpio = require('rpio')

const pin = 33

class Infrared {
  constructor() {
    this.init()
  }

  init () {
    rpio.open(pin, rpio.INPUT)
  }

  detect () {
    return !rpio.read(pin)
  }
}

module.exports = new Infrared()
