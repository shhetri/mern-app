interface Response {
  ok: boolean
  data?: { [prop: string]: any }
  code: number
  message: string
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
  data?: object
): Response => {
  return {
    data,
    code,
    message,
    ok: false,
  }
}
