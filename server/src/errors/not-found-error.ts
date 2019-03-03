import BaseError from './base-error'

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message)
    this.status = 404
    this.appStatus = 404
  }
}

export default NotFoundError
