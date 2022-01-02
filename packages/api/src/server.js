require('dotenv').config()
const package = require('../package.json')
const express = require('express')
const app = express()
const { LISTEN_PORT } = require('./env')

app.use(express.json())
app.use(require('./routes'))

app.get('/', function (req, res) {
  res.send({
    name: package.name,
    version: package.version
  })
})

app.listen(LISTEN_PORT, function () {
  console.log(`Api listen on ${LISTEN_PORT}`)
})

app.on('close', function () {
  require('./services/pzem-004t').close()
})