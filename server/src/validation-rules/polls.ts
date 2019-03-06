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

export const findPollRules = {
  params: Joi.object().keys({
    id: Joi.string()
      .trim()
      .required(),
  }),
}

export const voteRules = {
  ...findPollRules,
  body: Joi.object().keys({
    option: Joi.string()
      .trim()
      .required(),
  }),
}
