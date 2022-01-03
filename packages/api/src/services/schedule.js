const schedule = require('node-schedule')
const datastore = require('./datastore')
const historics = require('./historics')

/** @type {import('node-schedule').Job} */
let job = undefined

const getCronString = async function () {
  const value = await datastore.db.collection('config').findOne({})
  return value?.periodicity
}

/**
 * @param {string} value 
 */
const setCronString = async function (value) {
  cancel()
  const c = await datastore.db.collection('config').updateOne({}, { $set: { periodicity: value } }, { upsert: true })
  console.log(`set new periodicty: ${value}`)
  job = schedule.scheduleJob(value, historics.all)
}

const cancel = function () {
  if (job) {
    job.cancel()
  }
}

const reloadJob = async function () {
  const value = await getCronString()
  if (value) {
    job = schedule.scheduleJob(value, historics.all)
  }
}

module.exports = {
  getCronString,
  setCronString,
  cancel,
  reloadJob,
}