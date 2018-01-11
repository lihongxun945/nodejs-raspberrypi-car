const rpio = require('rpio')
const NanoTimer = require('nanotimer') //

const timer = new NanoTimer()

const IN = 28
const OUT = 27

let start = 0

const getCurrentTime = () => {
  hrtime = process.hrtime()
  return hrtime[1]
}

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
    const read = () => {
      if (!start) return false

      const c = rpio.read(IN)
      if (!c && last) {
        const duration = (getCurrentTime() - start) / 1000
        const result = parseInt(duration * 340 * 100 / 1e6 / 2) // 计算距离 cm
        if (result >= 2) {
          start = 0 // 只计算第一个返回的声波
          this.distance = result
        }
      }
      last = c
    }

    timer.setInterval(read, '', '5u')
  }

  detect () {
    rpio.write(OUT, 1)
    timer.setTimeout(() => {
      start = getCurrentTime()
      rpio.write(OUT, 0)
    }, '', '50u')
  }
}

module.exports = SR
