import BaseError from './base-error'

class ValidationError extends BaseError {
  constructor(detail: { [prop: string]: any }) {
    super('Validation failed')
    this.appStatus = 400
    this.status = 400
    this.detail = detail
  }
}

export default ValidationError
