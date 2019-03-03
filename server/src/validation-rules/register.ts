import Joi from 'joi'
import { username, password } from './common-rules'

const registerRules = {
  body: Joi.object().keys({
    username,
    password: password.max(8),
  }),
}

export default registerRules
