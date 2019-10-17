exports.consume = async (connection) => {
  let channel = await connection.createChannel()
  channel.consume('', async (msg) => {
    channel.ack(msg)
    require('../controller/basic_controller').create(msg.content.toString(), channel)
  })
}
