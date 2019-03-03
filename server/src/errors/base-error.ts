class BaseError extends Error {
  status: number
  appStatus: number
  detail?: { [prop: string]: any }

  constructor(message: string) {
    super(message)
  }
}

export default BaseError
