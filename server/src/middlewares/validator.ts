import { Request, Response, NextFunction } from 'express'
import ValidationError from '../errors/validation-error'
import { ObjectSchema } from 'joi'

const validator = (rules: { [prop: string]: ObjectSchema }) => (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  let hasValidationErrors = false
  const validationErrors: { [prop: string]: any } = {}
  const validationScopes = Object.keys(rules)

  validationScopes.forEach(key => {
    const rule = rules[key]
    const value = request[key]
    const result = rule.validate(value, { abortEarly: false })

    if (result.error) {
      hasValidationErrors = true
      validationErrors[key] = result.error.details.map(detail => ({
        path: detail.path.join('.'),
        message: detail.message,
      }))
    } else {
      request[key] = { ...result.value }
    }
  })

  hasValidationErrors ? next(new ValidationError(validationErrors)) : next()
}

export default validator
