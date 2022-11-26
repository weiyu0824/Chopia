import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { HttpException } from '../utils/HttpException'

export class AuthController implements Controller {
  public path = '/model'
  public router = Router()

  constructor() {
    this.initRouter()
  }
  private initRouter() {
    // this.router.use(bodyParser)
    this.router.post('/inference', (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body.username)
      console.log(req.body.token)
    })
  }
}
