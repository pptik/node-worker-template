const mongoose = require('mongoose')
const config = require('../config')

module.exports = {
  db: function () {
    return mongoose.createConnection(config.mongo, { keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000, useNewUrlParser: true })
  }
}
