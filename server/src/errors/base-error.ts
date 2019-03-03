class BaseError extends Error {
  status: number
  appStatus: number

  constructor(message: string) {
    super(message)
  }
}

export default BaseError
