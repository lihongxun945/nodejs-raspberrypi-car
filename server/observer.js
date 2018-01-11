const rpio = require('rpio')
const utils = require('./utils.js')

const SR = require('./sr.js')
const infrared = require('./infrared.js')

const threshold = 50 // 小于这个值，认为碰到障碍物

class Observer {
  constructor(options) {
    this.options = options || {
      onObstacle: undefined
    }
    this.init()
  }

  init () {
    this.sr = new SR()
    setInterval(() => {
      if (this.sr.distance <= threshold) {
        this.options.onObstacle()
      }
      if (infrared.detect()) { // 红外线发现障碍物
        this.options.onObstacle()
      }
    }, 20)
  }

  getAvailableDir (cb) {
    setTimeout(() => {
      const d = 1
      console.log(`available dir: ${d}`)
      cb(d)
    }, 2000)
  }

  isAvailable (cb) { // 前方是否可以通行
    const r = (this.sr.distance > threshold * 2) && (!infrared.detect()) // 可以通行的条件，比障碍物的条件要远一点
    console.log(`is available: ${r}`)
    cb(r)
  }

  tooClose () { // 是否已经几乎碰到障碍物
    return infrared.detect() || this.sr.distance < threshold / 2
  }
}

module.exports = Observer
