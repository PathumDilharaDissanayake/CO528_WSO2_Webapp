const Joi = require('joi');

const createTimeSlotSchema = Joi.object({
  date: Joi.date().required(),
  startTime: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  endTime: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
});

module.exports = {
  createTimeSlotSchema,
};
