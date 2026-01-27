const express = require('express');
const router = express.Router();
const { ingestNotification, getNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/ingest', ingestNotification);
router.get('/', protect, getNotifications);

module.exports = router;
