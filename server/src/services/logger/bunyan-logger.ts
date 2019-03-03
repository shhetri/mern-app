import bunyan, { LogLevelString } from 'bunyan'
import ILogger from './contract'

class BunyanLogger implements ILogger {
  private bunyan: bunyan

  constructor() {
    this.bunyan = bunyan.createLogger({
      name: 'mern',
      level: (process.env.LOG_LEVEL as LogLevelString) || bunyan.DEBUG,
    })
  }

  trace(value: any, ...params: any[]): void {
    this.bunyan.trace(value, ...params)
  }

  info(value: any, ...params: any[]): void {
    this.bunyan.info(value, ...params)
  }

  warn(value: any, ...params: any[]): void {
    this.bunyan.warn(value, ...params)
  }

  debug(value: any, ...params: any[]): void {
    this.bunyan.debug(value, ...params)
  }

  error(value: any, ...params: any[]): void {
    this.bunyan.error(value, ...params)
  }

  fatal(value: any, ...params: any[]): void {
    this.bunyan.fatal(value, ...params)
  }
}

export default new BunyanLogger()
