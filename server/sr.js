const rpio = require('rpio')

class SR {
  constructor () {
    this.init()
  }

  init () {
    rpio.open(13, rpio.INPUT)
    rpio.open(15, rpio.OUTPUT)

    setInterval(() => {
      this.detect()
    }, 500)

    setInterval(() => {
      if (rpio.read(13)) {
        console.log('###### read high')
      }
    })
  }

  detect () {
    console.log('send')
    rpio.write(15, 1)
    setTimeout(() => {
      rpio.write(5, 0)
    }, 1)
  }
}

module.exports = SR
