import { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authMiddleware from './auth'

class AppMiddleware {
  register(app: Application): void {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(authMiddleware)
  }
}

export default new AppMiddleware()
