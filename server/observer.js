const rpio = require('rpio')
const utils = require('./utils.js')

const SR = require('./sr.js')
const infrared = require('./infrared.js')

const threshold = 40 // 小于这个值，认为碰到障碍物

const servo = require('./servo.js') // 舵机

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
    servo.reset(() => { // 看前面是否通畅
      if (this.isAvailable()) {
        cb(0)
        return;
      }
      // 否则看左右
      const l = false
      const r = false
      servo.left(() => {
        if (this.isAvailable()) {
          l = true
        }
        servo.right(() => {
          if (this.isAvailable()) {
            r = true
          }
          // 取结果
          if (l && !r) return cb(3)
          if (!l && r) return cb(1)
          if (!l && !r) return cb(1)
          return cb([1, 3][utils.rand(2)])
        })
      })


    })
  }

  isAvailable (cb) { // 前方是否可以通行
    const r = (this.sr.distance > threshold * 2) && (!infrared.detect()) // 可以通行的条件，比障碍物的条件要远一点
    console.log(`is available: ${r}`)
    cb(r)
  }

  tooClose () { // 是否已经几乎碰到障碍物
    return infrared.detect() || this.sr.distance < (threshold / 2)
  }
}

module.exports = Observer
