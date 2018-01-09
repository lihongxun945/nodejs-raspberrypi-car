const express = require('express')
const path = require('path')
const compression = require('compression')

const dist = path.join(__dirname, '../dist')

const app = express()

app.use(compression())
app.use(express.static(dist, {
  maxage: '1h'
}))

app.use(require('./api.js'))

const port = 4000
app.listen(port, function () {
  console.log(`server start on port: ${port}`)
})
