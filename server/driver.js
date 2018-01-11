const rpio = require('rpio')

const pins = [11, 12, 15, 16]

const enablePins = [31, 32]

const s = [0, 0, 0, 0]
const f = [0, 1, 0, 1]
const b = [1, 0, 1, 0]
const l = [0, 1, 1, 0]
const r = [1, 0, 0, 1]


const speed = 4 // 1~10

const turnDuration = 150 * (20/speed)

class Driver {
  constructor() {
    this.init()
  }

  init () {
    pins.forEach((p, i) => {
      rpio.open(p, rpio.OUTPUT, 0)
    })
    enablePins.forEach((p) => {
      rpio.open(p, rpio.OUTPUT, 0)
    })
    setInterval(() => {
      enablePins.forEach((p) => {
        rpio.write(p, 1)
      })
      setTimeout(() => {
        enablePins.forEach((p) => {
          rpio.write(p, 0)
        })
      }, speed)
    }, 10)
  }

  go(dir, cb) {
    switch(dir) {
      case 0:
        this.forward(cb)
        break
      case 1:
        this.right(cb)
        break
      case 2:
        this.backward(cb)
        break
      case 3:
        this.left(cb)
        break
      default:
        this.stop(cb)
    }
  }

  forward (cb) {
    console.log('forward')
    pins.forEach((p, i) => {
      rpio.write(p, f[i])
    })
  }

  backward (cb) {
    console.log('backward')
    pins.forEach((p, i) => {
      rpio.write(p, b[i])
    })
  }

  backwardABit (cb) {
    console.log('backward a bit')
    this.backward()
    setTimeout(() => {
      this.stop()
      cb && cb()
    }, 500)
  }

  // 左转 45C
  left (cb) {
    console.log('turn left')
    pins.forEach((p, i) => {
      rpio.write(p, l[i])
    })

    setTimeout(() => {
      this.stop()
      cb && cb()
    }, turnDuration)
  }

  // 右转 45C
  right (cb) {
    console.log('turn right')
    pins.forEach((p, i) => {
      rpio.write(p, r[i])
    })

    setTimeout(() => {
      this.stop()
      cb && cb()
    }, turnDuration)
  }

  stop (cb) {
    console.log('stop')
    pins.forEach((p, i) => {
      rpio.write(p, s[i])
    })
    setTimeout(() => {
      cb && cb()
    }, 500)
  }
}

const driver = new Driver()

module.exports = driver
