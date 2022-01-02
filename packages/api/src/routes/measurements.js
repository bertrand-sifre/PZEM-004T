const app = require('express')()
const device = require('../services/pzem-004t')

app.get('/measurements', async function (req, res) {
  const value = await device.getMeasurements()
  res.json(value)
})

app.get('/voltage', async function (req, res) {
  const value = await device.getVoltage()
  res.json(value)
})

app.get('/current', async function (req, res) {
  const value = await device.getCurrent()
  res.json(value)
})

app.get('/power', async function (req, res) {
  const value = await device.getPower()
  res.json(value)
})

app.get('/energy', async function (req, res) {
  const value = await device.getEnergy()
  res.json(value)
})

app.get('/frequency', async function (req, res) {
  const value = await device.getFrequency()
  res.json(value)
})

app.get('/power-factor', async function (req, res) {
  const value = await device.getPowerFactor()
  res.json(value)
})

app.get('/alarm', async function (req, res) {
  const value = await device.getAlarm()
  res.json(value)
})

app.get('/alarm-thresold', async function (req, res) {
  const value = await device.getAlarmThresold()
  res.json(value)
})

app.get('/address', async function (req, res) {
  const value = await device.getAddress()
  res.json(value)
})

app.post('/alarm-thresold', async function (req, res) {
  const newValue = +req.body
  const value = await device.setAlarmThresold(newValue)
  res.json(value)
})

app.post('/address', async function (req, res) {
  const newValue = +req.body
  const value = await device.setAddress(newValue)
  res.json(value)
})

app.post('/reset-energy', async function (req, res) {
  const value = await device.resetEnergy()
  res.json(value)
})

app.post('/calibration', async function (req, res) {
  const value = await device.calibration()
  res.json(value)
})

module.exports = app