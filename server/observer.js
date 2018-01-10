const rpio = require('rpio')
const utils = require('./utils.js')

class Observer {
  constructor(options) {
    this.options = options || {
      onObstacle: undefined
    }
    this.init()
  }

  init () {
    setInterval(() => {
      if(utils.rand(4) === 0) {
        const onObstacle = this.options.onObstacle

        if (onObstacle) {
          console.log('on obstacle')
          onObstacle()
        }
      }
    }, 1000)
  }

  getAvailableDir (cb) {
    console.log('finding available direction')
    setTimeout(() => {
      const d = [0, 1, 3][utils.rand(3)]
      console.log(`available dir: ${d}`)
      cb(d)
    }, 2000)
  }

  isAvailable (cb) { // 前方是否可以通行
    const r = !!utils.rand(2)
    console.log(`is available: ${r}`)
    cb(r)
  }
}

module.exports = Observer
