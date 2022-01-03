const pzem004t = require('../services/pzem-004t')
const datastore = require('../services/datastore')

module.exports.all = async function () {
  const datas = await pzem004t.getMeasurements()
  return datastore.db.collection('measurements').insertOne(datas)
}