exports.publish = async (queue, channel, data) => {
  channel.publish(queue, new Buffer(data), {}) // queue-based
  channel.publish('exchange_name', 'routing_key', new Buffer(data), {}) // routing_key-based
}