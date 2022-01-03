require('dotenv').config()
const package = require('../package.json')
const express = require('express')
const app = express()
const { LISTEN_PORT } = require('./env')
const datastore = require('./services/datastore')
const schedule = require('./services/schedule')
const pzem004t = require('./services/pzem-004t')

app.use(express.json({ strict: false }))
app.use(require('./routes'))

app.get('/', function (req, res) {
  res.send({
    name: package.name,
    version: package.version
  })
})

app.listen(LISTEN_PORT, async function () {
  console.log(`Api listen on ${LISTEN_PORT}`)
  // connect to datastore
  await datastore.connect()
  pzem004t.connect()
  // relaunch all job
  await schedule.reloadJob()
})

app.on('close', function () {
  require('./services/pzem-004t').close()
  schedule.cancel()
  pzem004t.close()
  datastore.close()
})