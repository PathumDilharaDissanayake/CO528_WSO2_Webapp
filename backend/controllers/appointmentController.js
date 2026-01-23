const { Appointment, TimeSlot } = require('../models');

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

    const appointment = await Appointment.create({
      studentId,
      lecturerId,
      timeSlotId,
    });

    timeSlot.isBooked = true;
    await timeSlot.save();

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
      include: ['lecturer', 'timeSlot'],
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
      include: ['student', 'timeSlot'],
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

    appointment.status = status;
    await appointment.save();

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
