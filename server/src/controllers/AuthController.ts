import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { AuthService } from '../services/AuthService'
import { validateToken, refreshMiddleware } from '../middlewares/TokenValidation'
import App from '../App'

const authService = new AuthService()

export class AuthController implements Controller {
  public path = '/auth'
  public router = Router()

  constructor() {
    this.initRouter()
  }

  private initRouter() {
    this.router.post('/login', this.login)
    this.router.post('/register', this.register)
    this.router.delete('/logout', validateToken, this.logout)
    this.router.get('/refresh', refreshMiddleware, this.refresh)
    this.router.post('/login-with-token', validateToken, this.loginWithToken)
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email
    const password = req.body.password
    console.log('login', email, password)

    try {
      const serviceResult = await authService.login(email, password)
      res.send(serviceResult)
      next()
    } catch(err) {
      next(err)
    }

  }

  private register = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email
    const name: string = req.body.name
    const username: string = req.body.username
    const password: string = req.body.password
    console.log('register', email, name, username, password)

    try {
      const serviceResult = await authService.register(email, name, username, password)
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }

  private logout = (req: Request, res: Response, next: NextFunction) => {
    const verifiedName: string = req.body.verifiedName
    console.log('logout', verifiedName)
    try {
      const serviceResult = authService.logout(verifiedName)
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }

  private refresh = (req: Request, res: Response, next: NextFunction) => {
    const verifiedName: string = req.body.verifiedName
    try {
      const serviceResult = authService.refresh(verifiedName)
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }

  private loginWithToken = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    try {
      const serviceResult = await authService.loginWithToken(userId)
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }
}
