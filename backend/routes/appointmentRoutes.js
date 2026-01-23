const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getStudentAppointments,
  getLecturerAppointments,
  updateAppointment,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const {
  createAppointmentSchema,
  updateAppointmentSchema,
} = require('../validators/appointmentValidator');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Managing appointments
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lecturerId
 *               - timeSlotId
 *             properties:
 *               lecturerId:
 *                 type: integer
 *               timeSlotId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 studentId:
 *                   type: integer
 *                 lecturerId:
 *                   type: integer
 *                 timeSlotId:
 *                   type: integer
 *                 status:
 *                   type: string
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 *       400:
 *         description: Invalid input data or time slot already booked
 *       404:
 *         description: Time slot not found
 */
router
  .route('/')
  .post(protect, authorize('student'), validate(createAppointmentSchema), createAppointment);

/**
 * @swagger
 * /api/appointments/student:
 *   get:
 *     summary: Get all appointments for the logged-in student
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of student's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   studentId:
 *                     type: integer
 *                   lecturerId:
 *                     type: integer
 *                   timeSlotId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   lecturer:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   timeSlot:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 */
router.route('/student').get(protect, authorize('student'), getStudentAppointments);

/**
 * @swagger
 * /api/appointments/lecturer:
 *   get:
 *     summary: Get all appointments for the logged-in lecturer
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of lecturer's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   studentId:
 *                     type: integer
 *                   lecturerId:
 *                     type: integer
 *                   timeSlotId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   student:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   timeSlot:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 */
router.route('/lecturer').get(protect, authorize('lecturer'), getLecturerAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment's status
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, cancelled]
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 studentId:
 *                   type: integer
 *                 lecturerId:
 *                   type: integer
 *                 timeSlotId:
 *                   type: integer
 *                 status:
 *                   type: string
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not allowed to perform this action
 *       404:
 *         description: Appointment not found
 *       400:
 *         description: Invalid input data
 */
router
  .route('/:id')
  .put(protect, validate(updateAppointmentSchema), updateAppointment);

module.exports = router;
