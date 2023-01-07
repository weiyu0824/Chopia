import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { UserService } from '../services/UserService'
import { validateToken } from '../middlewares/TokenValidation'
import { runInThisContext } from 'vm'

const userService = new UserService()

export class UserController implements Controller {
  public path = '/user'
  public router = Router()

  constructor() {
    this.initRouter()
  }

  private initRouter() {
    this.router.get('/search', validateToken, this.searchUser)
    this.router.put('/add-friend', validateToken, this.addFriend)
    this.router.put('/edit-profile', validateToken, this.editProfile)
    this.router.put('/change-password', validateToken, this.changePassword)
  }

  private searchUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = ((req.query.email)? req.query.email : '' ) as string;
    const username = ((req.query.username)? req.query.username : '') as string;
    const serviceResult = await userService.search(email, username)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private addFriend = async (req: Request, res: Response, next: NextFunction) => {
    // this trigger when user accept friend request
    const userId = req.body.userId
    const friendUserId = req.body.friendUserId
    console.log('add friend')
    const serviceResult = await userService.addFriend(userId, friendUserId)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const name = req.body.name
    const username = req.body.username
    const avatar = req.body.avatar
    console.log('edit profile:', userId, name, avatar, username)
    const serviceResult = await userService.editProfile(userId, name, username, avatar)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }

  private changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    console.log('change password:', userId, oldPassword, newPassword)
    const serviceResult = await userService.changePassword(userId, oldPassword, newPassword)
    if (!serviceResult.error) {
      res.send(serviceResult)
    } else {
      next(serviceResult.error)
    }
  }
}