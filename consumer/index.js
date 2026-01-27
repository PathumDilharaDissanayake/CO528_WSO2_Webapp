const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const EVENT_EXCHANGE = 'appointment.events';
const QUEUE_NAME = 'notification-service';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';
const NOTIFY_TOKEN = process.env.NOTIFY_INGEST_TOKEN || 'lab_notify_token';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ingestNotification = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notifications/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-notify-token': NOTIFY_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Notification ingest failed:', response.status, text);
    }
  } catch (error) {
    console.error('Notification ingest error:', error.message);
  }
};

const start = async () => {
  const amqpUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
  const connection = await amqp.connect(amqpUrl);
  const channel = await connection.createChannel();

  await channel.assertExchange(EVENT_EXCHANGE, 'fanout', { durable: true });
  const { queue } = await channel.assertQueue(QUEUE_NAME, { durable: true });
  await channel.bindQueue(queue, EVENT_EXCHANGE, '');

  console.log(`Notification consumer listening on ${EVENT_EXCHANGE} -> ${queue}`);

  channel.consume(
    queue,
    async (message) => {
      if (!message) return;

      const content = message.content.toString();
      let payload;
      try {
        payload = JSON.parse(content);
      } catch (error) {
        console.error('Invalid message payload:', content);
        channel.nack(message, false, false);
        return;
      }

      console.log('Received event:', payload.eventName, 'entity:', payload.entityId);

      // Simulate async work (e.g., send email)
      await sleep(2000);
      await ingestNotification(payload);

      console.log('Processed event:', payload.eventName, 'entity:', payload.entityId);
      channel.ack(message);
    },
    { noAck: false }
  );
};

start().catch((error) => {
  console.error('Consumer failed to start:', error.message);
  process.exit(1);
});
