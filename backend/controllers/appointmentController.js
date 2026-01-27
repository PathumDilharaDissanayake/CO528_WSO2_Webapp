const { Appointment, TimeSlot, User } = require('../models');
const { publishEvent } = require('../utils/eventBus');

const createAppointment = async (req, res) => {
  const { lecturerId, timeSlotId } = req.body;
  const studentId = req.user.id;

  try {
    const timeSlot = await TimeSlot.findByPk(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    if (timeSlot.isBooked) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    if (Number(lecturerId) !== Number(timeSlot.lecturerId)) {
      return res.status(400).json({ message: 'Time slot does not belong to this lecturer' });
    }

    const lecturer = await User.findByPk(lecturerId);
    if (!lecturer || lecturer.role !== 'lecturer') {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    const appointment = await Appointment.create({
      studentId,
      lecturerId,
      timeSlotId,
    });

    timeSlot.isBooked = true;
    await timeSlot.save();

    const eventPayload = {
      eventName: 'AppointmentCreated',
      entityId: appointment.id,
      timestamp: new Date().toISOString(),
      meta: {
        studentId: appointment.studentId,
        lecturerId: appointment.lecturerId,
        timeSlotId: appointment.timeSlotId,
      },
    };

    await publishEvent(eventPayload);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentAppointments = async (req, res) => {
  const studentId = req.user.id;

  try {
    const appointments = await Appointment.findAll({
      where: { studentId },
      include: [
        { model: User, as: 'lecturer', attributes: ['id', 'name', 'email', 'role'] },
        { model: TimeSlot, as: 'timeSlot' },
      ],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLecturerAppointments = async (req, res) => {
  const lecturerId = req.user.id;

  try {
    const appointments = await Appointment.findAll({
      where: { lecturerId },
      include: [
        { model: User, as: 'student', attributes: ['id', 'name', 'email', 'role'] },
        { model: TimeSlot, as: 'timeSlot' },
      ],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (userRole === 'student' && appointment.studentId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this appointment' });
    }

    if (userRole === 'lecturer' && appointment.lecturerId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this appointment' });
    }

    const allowedStatuses = {
      student: ['cancelled'],
      lecturer: ['approved', 'rejected', 'completed'],
    };

    if (!allowedStatuses[userRole]?.includes(status)) {
      return res.status(403).json({ message: 'You are not allowed to set this status' });
    }

    if (status === 'completed' && appointment.status !== 'approved') {
      return res.status(400).json({ message: 'Only approved appointments can be completed' });
    }

    if (status === 'approved' && appointment.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending appointments can be approved' });
    }

    if (status === 'cancelled' && !['pending', 'approved'].includes(appointment.status)) {
      return res.status(400).json({ message: 'Only pending or approved appointments can be cancelled' });
    }

    if (status === 'rejected' && appointment.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending appointments can be rejected' });
    }

    appointment.status = status;
    await appointment.save();

    if (['cancelled', 'rejected'].includes(status)) {
      const timeSlot = await TimeSlot.findByPk(appointment.timeSlotId);
      if (timeSlot) {
        timeSlot.isBooked = false;
        await timeSlot.save();
      }
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getStudentAppointments,
  getLecturerAppointments,
  updateAppointment,
};
