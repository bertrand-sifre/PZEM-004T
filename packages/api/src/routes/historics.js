const app = require('express')()
const schedule = require('../services/schedule')
const datastore = require('../services/datastore')

app.get('/periodicity', async function (req, res) {
  const value = await schedule.getCronString()
  res.json(value)
})

app.post('/periodicity', async function (req, res) {
  const newValue = req.body
  await schedule.setCronString(newValue)
  res.send()
})

app.get('/voltage', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ voltage: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), voltage: d.voltage })))
})

app.get('/current', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ current: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), current: d.current })))
})

app.get('/power', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ power: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), power: d.power })))
})

app.get('/energy', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ energy: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), energy: d.energy })))
})

app.get('/frequency', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ frequency: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), frequency: d.frequency })))
})

app.get('/power-factor', async function (req, res) {
  const values = await datastore.db.collection('measurements').find({}).project({ powerFactor: 1 }).toArray()
  res.json(values.map(d => ({ date: new Date(d._id.getTimestamp()), powerFactor: d.powerFactor })))
})


module.exports = app