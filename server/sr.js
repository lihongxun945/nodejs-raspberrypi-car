const rpio = require('rpio')

const IN = 28
const OUT = 27

let start = 0

class SR {
  constructor () {
    this.init()
    this.distance = 9999
  }

  init () {
    rpio.open(IN, rpio.INPUT, 0)
    rpio.open(OUT, rpio.OUTPUT, 0)

    setInterval(() => {
      this.detect()
    }, 50)

    let last = 0
    setInterval(() => {
      if (!start) return false

      const c = rpio.read(IN)
      if (!c && last) {
        const duration = new Date - start
        this.distance = duration * 340 * 100 / 1000 / 2 // 计算距离 cm
        start = 0 // 只计算第一个返回的声波
      }
      last = c
    })
  }

  detect () {
    rpio.write(OUT, 1)
    setTimeout(() => {
      rpio.write(OUT, 0)
      start = + new Date
    }, 2)
  }
}

module.exports = SR
