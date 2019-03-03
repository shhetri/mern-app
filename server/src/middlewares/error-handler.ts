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
        error: Error | BaseError,
        _: Request,
        response: Response,
        __: NextFunction
      ): void => {
        const errorMessage = error.message || 'Something went wrong'

        const respondError = (baseError: BaseError): void =>
          void response
            .status(baseError.status || 500)
            .json(
              errorResponse(
                errorMessage,
                baseError.appStatus,
                baseError.detail ? baseError.detail : undefined,
                baseError.stack
              )
            )

        let newError: BaseError

        if (error instanceof BaseError) {
          newError = error
        } else {
          newError = new BaseError(errorMessage)
          newError.appStatus = 500
          newError.status = 500
        }

        if (process.env.NODE_ENV !== 'production') {
          newError.stack = error.stack
        }

        respondError(newError)
      }
    )
  }
}

export default new ErrorHandler()
