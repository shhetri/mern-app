import BaseError from './base-error'

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message)
    this.status = 400
    this.appStatus = 400
  }
}

export default BadRequestError
