import { IHTTPError } from '../../types/error'

class HTTPError extends Error implements IHTTPError {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export default HTTPError
