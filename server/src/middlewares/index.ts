import { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

class AppMiddleware {
  registerGlobalMiddleware(app: Application): void {
    app.use(cors())
    app.use(bodyParser.json())
  }
}

export default new AppMiddleware()
