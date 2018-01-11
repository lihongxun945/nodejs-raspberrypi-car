const rpio = require('rpio')
const NanoTimer = require('nanotimer') //

const timer = new NanoTimer()

const IN = 28
const OUT = 27

let start = 0

const cache = [999, 999, 999]
let i = 0

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
    }, 40)

    let last = 0
    const read = () => {
      if (!start) return false

      const c = rpio.read(IN)
      if (!c && last) {
        const duration = (getCurrentTime() - start) / 1000
        const result = parseInt(duration * 340 * 100 / 1e6 / 2) - 6 // 计算距离 cm
        if (result >= 2) { // 2cm 以内是杂音
          start = 0 // 只计算第一个返回的声波
          this._caculate(result)
        }
      }
      last = c
    }

    timer.setInterval(read, '', '10u')
  }

  _caculate(distance) {
    cache[i] = distance
    i ++
    if (i >= cache.length) i=0
    this.distance = Math.min.apply(undefined, cache)
  }

  detect () {
    // 如果一次开始的时候，发现start依然不是0，那么说明未收到回波，距离障碍物很远
    if (start) {
      this._caculate(999) // 写入一个10M 值
    }
    rpio.write(OUT, 1)
    timer.setTimeout(() => {
      start = getCurrentTime()
      rpio.write(OUT, 0)
    }, '', '50u')
  }
}

module.exports = SR
