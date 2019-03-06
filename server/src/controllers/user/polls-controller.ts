import { Request, Response, NextFunction } from 'express'
import { success } from '../../services/formatter/response'
import logger from '../../services/logger/logger'
import PollService from '../../services/poll-service'
import PollRepository from '../../respositories/poll-repository'
import NotFoundError from '../../errors/not-found-error'
import UnauthorizedError from '../../errors/unauthorized-error'
import BadRequestError from '../../errors/bad-request-error'

class PollsController {
  private readonly pollService = new PollService()
  private readonly pollRepository = new PollRepository()

  index = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = request.user
      await user.populate('polls').execPopulate()
      response.status(200).json(success({ polls: user.polls }))
    } catch (error) {
      logger.error({ req: request, err: error }, 'Error getting polls of user')
      next(error)
    }
  }

  create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = request.user
      const poll = await this.pollService.create(request.body, user)
      user.polls.push(poll.id)
      await user.save()

      response
        .status(201)
        .json(success({ poll }, 201, 'Poll successfully created'))
    } catch (error) {
      logger.error({ req: request, err: error }, 'Error creating poll')
      next(error)
    }
  }

  destroy = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = request.params.id
    try {
      const user = request.user
      const poll = await this.pollRepository.findById(id)

      if (!poll) {
        throw new NotFoundError('Poll with the given id does not exist')
      }

      if (poll.user._id.toString() !== user.id.toString()) {
        throw new UnauthorizedError(
          'You do not have permission to delete this poll'
        )
      }

      await poll.remove()
      user.polls = user.polls.filter(userPoll => userPoll.toString() !== id)
      await user.save()

      response.json(success(undefined, 200, 'Poll successfully deleted'))
    } catch (error) {
      logger.error(
        { req: request, err: error },
        `Error deleting poll with id: ${id}`
      )
      next(error)
    }
  }

  vote = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = request.params.id
    try {
      const user = request.user
      const poll = await this.pollRepository.findById(id)

      if (!poll) {
        throw new NotFoundError('Poll with the given id does not exist')
      }

      if (poll.user._id.toString() === user.id.toString()) {
        throw new UnauthorizedError(
          'You are not authorized to vote in your own poll'
        )
      }

      const selectedOption = poll.options.find(
        option => option.name === request.body.option
      )

      if (!selectedOption) {
        throw new BadRequestError(
          'The provided option does not exist in the poll'
        )
      }

      selectedOption.votes += 1
      poll.voted.push(user.id)
      await poll.save()

      response.json(success({ poll }, 200, 'Successfully voted'))
    } catch (error) {
      logger.error(
        { req: request, err: error },
        `Error voting for poll with id: ${id}`
      )
      next(error)
    }
  }
}

export default new PollsController()
