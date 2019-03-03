import { Application, NextFunction, Response, Request } from 'express'
import BaseError from '../errors/base-error'
import NotFoundError from '../errors/not-found-error'
import { error as errorResponse } from '../services/formatter/response'

class ErrorHandler {
  handle(app: Application) {
    this.handleNotFound(app)
    this.handleError(app)
  }

  private handleNotFound(app: Application) {
    app.use(
      '*',
      (_: Request, __: Response, next: NextFunction): void => {
        const error = new NotFoundError('Not Found')

        next(error)
      }
    )
  }

  private handleError(app: Application) {
    app.use(
      (
        error: BaseError,
        _: Request,
        response: Response,
        __: NextFunction
      ): void => {
        const errorMessage = error.message || 'Something went wrong'
        response
          .status(error.status || 500)
          .json(
            errorResponse(
              errorMessage,
              error.appStatus,
              error.detail ? error.detail : undefined
            )
          )
      }
    )
  }
}

export default new ErrorHandler()
