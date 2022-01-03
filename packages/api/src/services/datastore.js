const { MONGO_URL } = require('../env')
const { MongoClient } = require('mongodb')

const Datastore = function () {
  /** @type {import('mongodb').Db} */
  this.db = null
  /** @type {import('mongodb').MongoClient} */
  this.client = null
}

Datastore.prototype.connect = async function () {
  this.client = new MongoClient(MONGO_URL)
  await this.client.connect(function () { console.log('Connected to mongoDb') })
  this.db = this.client.db('pzem-004t')
}

Datastore.prototype.close = function () {
  if (this.client) {
    this.client.close()
  }
}

module.exports = new Datastore()
