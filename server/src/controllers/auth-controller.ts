import { Request, Response, NextFunction } from 'express'
import UserRepository from '../respositories/user-repository'
import UserService from '../services/user-service'
import { success } from '../services/formatter/response'
import { User } from '../models/user'
import logger from '../services/logger/logger'

class AuthController {
  private readonly userRepository: UserRepository
  private readonly userService: UserService

  constructor() {
    this.userRepository = new UserRepository()
    this.userService = new UserService()
  }

  register = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user: User = await this.userRepository.register(request.body)

      response.status(201).json(success({ user }, 201))
    } catch (error) {
      logger.error({ req: request, err: error }, 'Registration failed')
      next(error)
    }
  }

  login = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { username, password } = request.body
      const authenticatedUserWithToken: {
        user: User
        token: string
      } = await this.userService.login(username, password)

      response
        .status(200)
        .json(
          success(authenticatedUserWithToken, 200, 'Successfully logged in')
        )
    } catch (error) {
      logger.error({ req: request, err: error }, 'Login failed')
      next(error)
    }
  }
}

export default new AuthController()
