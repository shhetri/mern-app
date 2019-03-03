import { User } from '../models/user'
import UserRepository from '../respositories/user-repository'
import jwt from 'jsonwebtoken'
import BadRequestError from '../errors/bad-request-error'

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(
    username: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user: User = await this.userRepository.findOne({ username })

    if (!user) {
      throw new BadRequestError('Invalid username/password')
    }

    const isCorrectPassword: boolean = await user.comparePassword(password)

    if (!isCorrectPassword) {
      throw new BadRequestError('Invalid username/password')
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET)

    return { user, token }
  }
}

export default UserService
