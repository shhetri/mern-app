declare interface HTTPError extends Error {
  status?: number
}

export = HTTPError
