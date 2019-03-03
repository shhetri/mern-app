import BaseError from './base-error'

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message)
    this.status = 401
    this.appStatus = 401
  }
}

export default UnauthorizedError
