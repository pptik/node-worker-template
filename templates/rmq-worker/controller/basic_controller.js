const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const publisher = require('../services/publisher')

exports.create = async (message, channel) => {
  try {
    let client = await MongoClient.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    let database = await client.db()
    let collection = database.collection('')
    message = JSON.parse(message)
    let payload = {
      // payload to insert
    }

    await publisher.publish('queue_name', channel, data)
    await collection.insertOne(payload)
    client.close()

    return true
  } catch (err) {
    throw new Error(err)
  }
}