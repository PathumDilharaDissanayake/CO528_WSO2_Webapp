const { Notification } = require('../models');

const ingestNotification = async (req, res) => {
  const token = req.header('x-notify-token');
  const expectedToken = process.env.NOTIFY_INGEST_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return res.status(401).json({ message: 'Invalid notify token' });
  }

  const { eventName, entityId, timestamp } = req.body || {};

  if (!eventName || !entityId || !timestamp) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    const notification = await Notification.create({
      eventName,
      entityId,
      eventTimestamp: new Date(timestamp),
      payload: req.body,
    });

    res.status(201).json({ id: notification.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [['id', 'DESC']],
      limit: 50,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ingestNotification,
  getNotifications,
};
