import { Request, Response, NextFunction } from 'express'
import UserRepository from '../respositories/user-repository'
import UserService from '../services/user-service'
import { success } from '../response'
import { User } from '../models/user'

class AuthController {
  private readonly userRepository: UserRepository
  private readonly userService: UserService

  constructor() {
    this.userRepository = new UserRepository()
    this.userService = new UserService()
  }

  async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user: User = await this.userRepository.register(request.body)

      response.status(201).json(success(user, 201))
    } catch (error) {
      next(error)
    }
  }

  async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { username, password } = request.body
      const authenticatedUser: {
        user: User
        token: string
      } = await this.userService.login(username, password)

      response
        .status(200)
        .json(success(authenticatedUser, 200, 'Successfully logged in'))
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
