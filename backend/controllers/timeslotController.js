const { TimeSlot } = require('../models');

const createTimeSlot = async (req, res) => {
  const { date, startTime, endTime } = req.body;
  const lecturerId = req.user.id;

  try {
    const toMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    if (toMinutes(startTime) >= toMinutes(endTime)) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    const timeSlot = await TimeSlot.create({
      lecturerId,
      date,
      startTime,
      endTime,
    });
    res.status(201).json(timeSlot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLecturerTimeSlots = async (req, res) => {
  const { id } = req.params;

  try {
    const timeSlots = await TimeSlot.findAll({ where: { lecturerId: id } });
    res.json(timeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTimeSlot = async (req, res) => {
  const { id } = req.params;
  const lecturerId = req.user.id;

  try {
    const timeSlot = await TimeSlot.findByPk(id);

    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    if (timeSlot.lecturerId !== lecturerId) {
      return res.status(403).json({ message: 'You are not authorized to delete this time slot' });
    }

    if (timeSlot.isBooked) {
      return res.status(400).json({ message: 'Cannot delete a booked time slot' });
    }

    await timeSlot.destroy();
    res.json({ message: 'Time slot removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTimeSlot,
  getLecturerTimeSlots,
  deleteTimeSlot,
};
