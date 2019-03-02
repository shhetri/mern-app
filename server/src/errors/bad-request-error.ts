import HTTPError from './http-error'

class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 400)
  }
}

export default BadRequestError
