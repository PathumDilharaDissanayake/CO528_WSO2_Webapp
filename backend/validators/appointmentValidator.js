const Joi = require('joi');

const createAppointmentSchema = Joi.object({
  lecturerId: Joi.number().integer().required(),
  timeSlotId: Joi.number().integer().required(),
});

const updateAppointmentSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected', 'cancelled', 'completed')
    .required(),
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
};
