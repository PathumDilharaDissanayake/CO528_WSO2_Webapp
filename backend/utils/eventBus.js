const amqp = require('amqplib');

const EVENT_EXCHANGE = 'appointment.events';

let connection;
let channel;

const getChannel = async () => {
  if (channel) {
    return channel;
  }

  const amqpUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
  connection = await amqp.connect(amqpUrl);
  channel = await connection.createChannel();
  await channel.assertExchange(EVENT_EXCHANGE, 'fanout', { durable: true });
  return channel;
};

const publishEvent = async (payload) => {
  try {
    const activeChannel = await getChannel();
    const message = Buffer.from(JSON.stringify(payload));
    activeChannel.publish(EVENT_EXCHANGE, '', message, { persistent: true });
    return true;
  } catch (error) {
    console.error('Event publish failed:', error.message);
    return false;
  }
};

const closeConnection = async () => {
  try {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
  } catch (error) {
    console.error('Failed to close AMQP connection:', error.message);
  }
};

module.exports = {
  EVENT_EXCHANGE,
  publishEvent,
  closeConnection,
};
