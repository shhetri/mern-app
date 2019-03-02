import { Application, NextFunction, Response, Request } from 'express'
import HTTPError from '../errors/http-error'

class ErrorHandler {
  handle(app: Application) {
    this.handleNotFound(app)
    this.handleError(app)
  }

  private handleNotFound(app: Application) {
    app.use(
      '*',
      (_: Request, __: Response, next: NextFunction): void => {
        const error: HTTPError = new HTTPError('Not Found', 404)

        next(error)
      }
    )
  }

  private handleError(app: Application) {
    app.use(
      (
        error: HTTPError,
        _: Request,
        response: Response,
        __: NextFunction
      ): void => {
        response.status(error.status || 500).json({
          error: error.message || 'Something went wrong',
        })
      }
    )
  }
}

export default new ErrorHandler()
