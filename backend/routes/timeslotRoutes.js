const express = require('express');
const router = express.Router();
const {
  createTimeSlot,
  getLecturerTimeSlots,
  deleteTimeSlot,
} = require('../controllers/timeslotController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { createTimeSlotSchema } = require('../validators/timeslotValidator');

/**
 * @swagger
 * tags:
 *   name: Time Slots
 *   description: Managing lecturer time slots
 */

/**
 * @swagger
 * /api/timeslots:
 *   post:
 *     summary: Create a new time slot
 *     tags: [Time Slots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-02-01"
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "10:30"
 *     responses:
 *       201:
 *         description: Time slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 lecturerId:
 *                   type: integer
 *                 date:
 *                   type: string
 *                 startTime:
 *                   type: string
 *                 endTime:
 *                   type: string
 *                 isBooked:
 *                   type: boolean
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 *       400:
 *         description: Invalid input data
 */
router
  .route('/')
  .post(protect, authorize('lecturer'), validate(createTimeSlotSchema), createTimeSlot);

/**
 * @swagger
 * /api/timeslots/lecturer/{id}:
 *   get:
 *     summary: Get all time slots for a specific lecturer
 *     tags: [Time Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The lecturer ID
 *     responses:
 *       200:
 *         description: A list of time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   lecturerId:
 *                     type: integer
 *                   date:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                   endTime:
 *                     type: string
 *                   isBooked:
 *                     type: boolean
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Lecturer not found (though this endpoint returns empty array if no lecturer found)
 */
router.route('/lecturer/:id').get(protect, getLecturerTimeSlots);

/**
 * @swagger
 * /api/timeslots/{id}:
 *   delete:
 *     summary: Delete a time slot
 *     tags: [Time Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The time slot ID
 *     responses:
 *       200:
 *         description: Time slot removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Time slot removed"
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 *       404:
 *         description: Time slot not found
 */
router
  .route('/:id')
  .delete(protect, authorize('lecturer'), deleteTimeSlot);

module.exports = router;
