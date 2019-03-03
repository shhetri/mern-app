import UserModel, { User } from '../models/user'
import BadRequestError from '../errors/bad-request-error'

class UserRepository {
  async register(user: User): Promise<User> {
    try {
      return await UserModel.create(user)
    } catch (error) {
      if (error.code && error.code === 11000) {
        throw new BadRequestError(`Username ${user.username} already exists`)
      }

      throw error
    }
  }

  async findOne(conditions: any): Promise<User> {
    return UserModel.findOne(conditions)
  }
}

export default UserRepository
