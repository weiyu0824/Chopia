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
    this.router.post('/verify', this.verify)
    this.router.post('/send-mail', this.sendMail)
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
      if (!serviceResult.success) {
        res.send(serviceResult)
      }else {
        await authService.storeVerfication(serviceResult.userId)
        res.send({
          success: true,
          message: 'We have send verificication letter to your email',
          userId: serviceResult.userId
        })
      } 
      next()
    } catch (err) {
      console.log('register get error')
      next(err)
    }
  }

  private logout = (req: Request, res: Response, next: NextFunction) => {
    // const verifiedName: string = req.body.verifiedName
    // console.log('logout', verifiedName)
    // try {
    //   const serviceResult = authService.logout(verifiedName)
    //   res.send(serviceResult)
    //   next()
    // } catch (err) {
    //   next(err)
    // }
  }

  private refresh = (req: Request, res: Response, next: NextFunction) => {
    // const verifiedName: string = req.body.verifiedName
    // try {
    //   const serviceResult = authService.refresh(verifiedName)
    //   res.send(serviceResult)
    //   next()
    // } catch (err) {
    //   next(err)
    // }
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

  private verify = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const verificationToken = req.body.verificationToken
    // 1. check if this user exist
    // 1. check if this user already verified, if verified then return
    // 2. if this token not valid or expired then return
    // 3. verify user, delete userVerification, and login 
    // 4. return login result

    console.log('Controller verify')
    console.log(userId)
    console.log(verificationToken)
    try {
      const serviceResult = await authService.verify(userId, verificationToken)
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }

  private sendMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check if  this email correct
      // send email here
      res.send({
        success: true,
        message: 'Sent!'
      })
    } catch (err) {
      next(err)
    }
  }
}
