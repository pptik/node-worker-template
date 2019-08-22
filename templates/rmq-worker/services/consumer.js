exports.consume = async (connection) => {
  let channel = await connection.createChannel()
  channel.consume('queue_name', async (msg) => { // Jika ada pesan masuk
    channel.ack(msg)
    console.log('=================================================')
    console.log('INCOMING MESSAGE', msg.fields.routingKey)
    let message = JSON.parse(msg.content.toString()) // Parse pesannya menjadi JSON object (yang sebelumnya JSON string)
  })
} 