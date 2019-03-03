import Joi from 'joi'

export const createPollRules = {
  body: Joi.object().keys({
    question: Joi.string()
      .trim()
      .required(),
    options: Joi.array()
      .items(Joi.any())
      .min(1)
      .required(),
  }),
}
