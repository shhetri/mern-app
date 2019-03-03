import { Request, Response, NextFunction } from 'express'
import PollService from '../services/poll-service'
import UserRepository from '../respositories/user-repository'
import { success } from '../services/formatter/response'
import logger from '../services/logger/logger'

class PollsController {
  private readonly pollService = new PollService()
  private readonly userRepository = new UserRepository()

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne({
        username: request.user.username,
      })

      await user.populate('polls').execPopulate()
      response.status(200).json(success({ polls: user.polls }))
    } catch (error) {
      logger.error({ req: request, err: error }, 'Error getting polls of user')
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const user = await this.userRepository.findOne({
        username: request.user.username,
      })

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
}

export default new PollsController()
