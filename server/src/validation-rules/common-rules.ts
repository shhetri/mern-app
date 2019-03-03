import Joi from 'joi'

export const username = Joi.string()
  .trim()
  .alphanum()
  .min(5)
  .required()

export const password = Joi.string()
  .trim()
  .min(7)
  .required()
