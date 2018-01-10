const rpio = require('rpio')
const utils = require('./utils.js')

const SR = require('./sr.js')
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
    }, 50)
  }

  getAvailableDir (cb) {
    setTimeout(() => {
      const d = [1, 3][utils.rand(2)]
      console.log(`available dir: ${d}`)
      cb(d)
    }, 2000)
  }

  isAvailable (cb) { // 前方是否可以通行
    const r = this.sr.distance > threshold
    console.log(`is available: ${r}`)
    cb(r)
  }
}

module.exports = Observer
