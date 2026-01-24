const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lecturerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  timeSlotId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'TimeSlots', // 'TimeSlots' would be the table name
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Appointment;
