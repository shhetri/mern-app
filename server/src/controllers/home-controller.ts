import { Request, Response } from 'express'

class HomeController {
  private a: number

  constructor() {
    this.a = 10
  }

  index(request: Request, response: Response): void {
    response.send({
      a: this.a + 10,
      message: 'Home is running inside controller',
      params: request.params,
      query: request.query,
    })
  }
}

export default new HomeController()
