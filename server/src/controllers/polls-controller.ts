import { Request, Response, NextFunction } from 'express'
import { success } from '../services/formatter/response'
import logger from '../services/logger/logger'
import PollRepository from '../respositories/poll-repository'
import NotFoundError from '../errors/not-found-error'

class PollsController {
  private readonly pollRepository = new PollRepository()

  index = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const polls = await this.pollRepository.findAll()
      response.status(200).json(success({ polls }))
    } catch (error) {
      logger.error({ req: request, err: error }, 'Error getting polls of user')
      next(error)
    }
  }

  find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = request.params.id
    try {
      const poll = await this.pollRepository.findById(id)

      if (!poll) {
        throw new NotFoundError('Poll with the given id does not exist')
      }

      response.json(success({ poll }))
    } catch (error) {
      logger.error(
        { req: request, err: error },
        `Error finding the poll with id: ${id}`
      )
      next(error)
    }
  }
}

export default new PollsController()
