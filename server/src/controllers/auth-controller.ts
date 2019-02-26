import { Request, Response } from 'express'
import UserModel, { User } from '../models/user'

class AuthController {
  async register(request: Request, response: Response): Promise<any> {
    try {
      const user: User = await UserModel.create(request.body)

      response.status(201).json({ data: user })
    } catch (error) {
      response.status(500).json({ error })
    }
  }

  async login(request: Request, response: Response): Promise<any> {
    try {
      const {
        username,
        password,
      }: { username: string; password: string } = request.body
      const user: User = await UserModel.findOne({ username })

      if (!user) {
        throw new Error('Invalid username/password')
      }

      const isAuthenticated: boolean = await user.comparePassword(password)

      if (!isAuthenticated) {
        throw new Error('Invalid username/password')
      }

      response.status(200).json({ data: user })
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  }
}

export default new AuthController()
