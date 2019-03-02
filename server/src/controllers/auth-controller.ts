import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user'
import UserRepository from '../respositories/user-repository'
import UserService from '../services/user-service'

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
      const user: User = await this.userRepository.create(request.body)

      response.status(201).json({ data: user })
    } catch (error) {
      next(error)
    }
  }

  async login(request: Request, response: Response): Promise<any> {
    try {
      const { username, password } = request.body
      const authenticatedUser = await this.userService.login(username, password)

      if (!authenticatedUser) {
        throw new Error('Invalid username/password')
      }

      response.status(200).json({ data: authenticatedUser })
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  }
}

export default new AuthController()
