const driver = require('./driver.js')
const Observer = require('./observer.js')
const utils = require('./utils.js')
const SR = require('./sr.js')

class Captain {
  constructor() {
    this._start = false // 启动
    this._driving = false // 行驶
    this.init()
  }

  init () {
    // this.sr = new SR()
    this.observer = new Observer({
      onObstacle: () => {
        if (!this._start || !this._driving) {
          // already stopped
        } else {
          console.log('on obstacle')
          this._driving = false
          driver.stop(() => {
            this.go()
          })
        }
      }
    })
  }

  go () {
    this.observer.isAvailable((a) => {
      // 如果前方可以通行，那么就通行
      if (a) {
        driver.forward()
        this._driving = true
      } else {
      // 否则，获取一个可以通行的方向，并转向，然后再次进行判断
        this.observer.getAvailableDir((d) => {
          if (d === 0) { // 可能由于障碍物移动，导致前方又可以通行
            this.go() 
          } else { // 转向，然后检测是否可以通行
            driver.go(d, () => {
              this.go()
            })
          }
        })
      }
    })
  }

  start () {
    this._start = true
    this.go()
  }

  stop () {
    this._start = false
    this._driving = false
    driver.stop()
  }
}

const captain = new Captain()

captain.start()

module.exports = captain
