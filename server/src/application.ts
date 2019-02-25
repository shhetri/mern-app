import { Application } from 'express'
import routes from './routes'
import logger from './logger/logger'
import express = require('express')

class MERNApplication {
  static create(): MERNApplication {
    const mernApp = new MERNApplication()
    mernApp.registerRoutes()

    return mernApp
  }

  private app: Application

  private constructor() {
    this.app = express()
  }

  async listen(port: number): Promise<any> {
    try {
      await this.app.listen(port)
    } catch (err) {
      logger.info(`Server started listening on http://localhost:${port}`)
    }
  }

  private registerRoutes(): void {
    this.app.use('/api', routes)
  }
}

export default MERNApplication
