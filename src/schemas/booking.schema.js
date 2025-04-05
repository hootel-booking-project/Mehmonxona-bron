import Joi from "joi";

export const createBookingSchema = Joi.object({
  userId: Joi.string().required(),

  roomId: Joi.number().required(),

  dayIn: Joi.date().iso().min("now").required(),

  dayOut: Joi.date().iso().greater(Joi.ref("dayIn")).required(),
});

export const updateBookingSchema = Joi.object({
  userId: Joi.string().required(),

  roomId: Joi.string().required(),

  dayIn: Joi.date().iso().min("now").required(),

  dayOut: Joi.date().iso().greater(Joi.ref("dayIn")).required(),
});

