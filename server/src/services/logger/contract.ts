interface ILogger {
  trace(value: Error | {} | any, ...params: any[]): void
  info(value: Error | {} | any, ...params: any[]): void
  warn(value: Error | {} | any, ...params: any[]): void
  debug(value: Error | {} | any, ...params: any[]): void
  error(value: Error | {} | any, ...params: any[]): void
  fatal(value: Error | {} | any, ...params: any[]): void
}

export default ILogger
