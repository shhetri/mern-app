import { User } from '../models/user'
import UserRepository from '../respositories/user-repository'

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(username: string, password: string): Promise<boolean | User> {
    const user: User = await this.userRepository.findOne({ username })

    if (!user) {
      return false
    }

    return (await user.comparePassword(password)) && user
  }
}

export default UserService
