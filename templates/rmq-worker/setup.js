const config = require('./config')
const rmq = require('amqplib')

module.exports = {
  connectToRmq: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let rmqConn = await rmq.connect(config.rmq)
        resolve(rmqConn)
      } catch (error) {
        console.log('failed connect to rmq: ', error)
        reject(error)
      }
    })
  }
}
