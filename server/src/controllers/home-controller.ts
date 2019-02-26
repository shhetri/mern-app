import { Request, Response } from 'express'

class HomeController {
  index(_: Request, response: Response): void {
    response.json({
      port: process.env.PORT,
    })
  }
}

export default new HomeController()
