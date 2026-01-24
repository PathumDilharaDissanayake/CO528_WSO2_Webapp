const sequelize = require('../config/database');
const User = require('./User');
const TimeSlot = require('./TimeSlot');
const Appointment = require('./Appointment');

// User-TimeSlot association
User.hasMany(TimeSlot, { foreignKey: 'lecturerId' });
TimeSlot.belongsTo(User, { as: 'lecturer', foreignKey: 'lecturerId' });

// User-Appointment associations
User.hasMany(Appointment, { foreignKey: 'studentId' });
Appointment.belongsTo(User, { as: 'student', foreignKey: 'studentId' });

User.hasMany(Appointment, { foreignKey: 'lecturerId' });
Appointment.belongsTo(User, { as: 'lecturer', foreignKey: 'lecturerId' });

// Appointment-TimeSlot association
TimeSlot.hasOne(Appointment, { foreignKey: 'timeSlotId' });
Appointment.belongsTo(TimeSlot, { as: 'timeSlot', foreignKey: 'timeSlotId' });

const models = {
  User,
  TimeSlot,
  Appointment,
};

const db = {
  ...models,
  sequelize,
};

module.exports = db;
