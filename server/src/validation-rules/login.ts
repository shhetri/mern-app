import Joi from 'joi'
import { username, password } from './common-rules'

const loginRules = {
  body: Joi.object().keys({
    username,
    password,
  }),
}

export default loginRules
