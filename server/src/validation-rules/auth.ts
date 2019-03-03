import Joi from 'joi'

const username = Joi.string()
  .trim()
  .alphanum()
  .min(5)
  .required()

const password = Joi.string()
  .trim()
  .min(7)
  .required()

export const loginRules = {
  body: Joi.object().keys({
    username,
    password,
  }),
}

export const registerRules = {
  body: Joi.object().keys({
    username,
    password: password.max(8),
  }),
}
