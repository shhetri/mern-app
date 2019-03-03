interface Response {
  ok: boolean
  data?: { [prop: string]: any }
  code: number
  message: string
  stack?: string
}

export const success = (
  data: object | null,
  code: number = 200,
  message?: string
): Response => {
  return {
    code,
    data,
    message,
    ok: true,
  }
}

export const error = (
  message?: string,
  code: number = 500,
  data?: object,
  stack?: string
): Response => {
  return {
    data,
    code,
    message,
    stack,
    ok: false,
  }
}
