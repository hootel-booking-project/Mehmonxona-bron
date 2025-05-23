import Joi from "joi";

export const roomSchema = Joi.object({
  number: Joi.number().integer().min(1).required(),
  type: Joi.string().valid("single", "double", "suite", "deluxe").required(),
  price: Joi.number().positive().required(),
  status: Joi.string().valid("available", "booked", "maintenance").default("available"),
}).required();
