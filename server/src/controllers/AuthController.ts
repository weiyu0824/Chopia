import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { HttpException } from '../utils/HttpException'
import { HttpResult } from '../interfaces/HttpResult'
import { AuthService } from '../services/AuthService'
import { User } from '../models/User'
import { jwtMiddleware } from '../middlewares/JwtMiddleware'

const authService = new AuthService()

// interfaces
interface LoginResult extends HttpResult {
  accessToken: string
  refreshToken: string
}

interface RegisterResult extends HttpResult {
  accessToken: string
  refreshToken: string
}

interface RefreshResult extends HttpResult {
  accessToken: string
}

interface logoutResult extends HttpResult {
}

export class AuthController implements Controller {
  public path = '/auth'
  public router = Router()

  constructor() {
    this.initRouter()
  }

  private initRouter() {
    this.router.post('/login', this.login)
    this.router.post('/register', this.register)
    this.router.delete('/logout', jwtMiddleware, this.logout)
    this.router.get('/refresh', jwtMiddleware, this.refresh)
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username
    const password = req.body.password
    console.log('login', username, password)

    const serviceResult = await authService.login(username, password)
    if (!serviceResult.error) {
      const result: LoginResult = {
        succuss: serviceResult.success ?? false,
        message: serviceResult.message ?? '',
        accessToken: serviceResult.accessToken ?? '',
        refreshToken: serviceResult.refreshToken ?? ''
      }
      res.send(result)

    } else {
      next(serviceResult.error)
    }
  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const username: string = req.body.username
    const password: string = req.body.password
    console.log('register', username, password)

    const serviceResult = await authService.register(username, password)

    if (!serviceResult.error) {
      const result: RegisterResult = {
        succuss: serviceResult.success ?? false,
        message: serviceResult.message ?? '',
        accessToken: serviceResult.accessToken ?? '',
        refreshToken: serviceResult.refreshToken ?? ''
      }
      res.send(result)

    } else {
      next(serviceResult.error)
    }
  }

  private logout = (req: Request, res: Response, next: NextFunction) => {
    const verifiedName: string = req.body.verifiedName
    console.log('logout', verifiedName)

    const serviceResult = authService.logout(verifiedName)
    if (!serviceResult.error) {
      res.send({
        succuss: serviceResult.success ?? false,
        message: serviceResult.message ?? ''
      })
    } else {
      next(serviceResult.error)
    }
  }

  private refresh = (req: Request, res: Response, next: NextFunction) => {
    res.send('refresh')
  }

}
