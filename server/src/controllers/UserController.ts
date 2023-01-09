import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { UserService } from '../services/UserService'
import { validateToken } from '../middlewares/TokenValidation'
import { setTimeout } from 'timers/promises'
import { getCurrTimestamp } from '../utils/time'
import { NotifService } from '../services/NotifService'
import { NotifServer } from '../servers/NotifServer'

const userService = new UserService()
const notifService = new NotifService()

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
    this.router.put('/accept-friend', validateToken, this.acceptFriend)
  }

  private searchUser = async (req: Request, res: Response, next: NextFunction) => {
    await setTimeout(1000)
    const email = ((req.query.email)? req.query.email : '' ) as string;
    const username = ((req.query.username)? req.query.username : '') as string;
    try {
      const serviceResult = await userService.search(email, username)
      res.send(serviceResult)
    } catch (err) {
      next(err)
    }
  }

  private editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const name = req.body.name
    const username = req.body.username
    const avatar = req.body.avatar

    try {
      const serviceResult = await userService.editProfile(userId, name, username, avatar)
      res.send(serviceResult)
    } catch (err) {
      next(err)
    }
  }

  private changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    try {
      const serviceResult = await userService.changePassword(userId, oldPassword, newPassword)
      res.send(serviceResult)
    } catch (err) {
      next(err)
    }
  }

  private addFriend = async (req: Request, res: Response, next: NextFunction) => {
    // send request
    // 1. write to notification DB
    // 2. send 'friend request' notif to user

    const userId = req.body.userId
    const friendId = req.body.friendId
    const type = 'friend-request'
    const timestamp = getCurrTimestamp()

    try {
      const serviceResult = await notifService.addNotif(userId, friendId, type, timestamp)
      res.send(serviceResult)
      res.locals = {
        notifs: [
          {initiatorId: userId, receiverId: friendId, type, timestamp},
        ] 
      }
      next()
    } catch (err) {
      next(err)
    }
  }

  private acceptFriend = async (req: Request, res: Response, next: NextFunction) => {
    // this trigger when user accept friend request
    // 1. write to user DB
    // 2. remove this notification
    // 3. write new notification to DB 'you are now friend'
    // 4. send 'you are now friend' notif to user
    const userId = req.body.userId
    const friendId = req.body.friendId
    const notifId = req.body.notifId

    try {
      const serviceResult = await userService.addFriend(userId, friendId)
      const timestamp = getCurrTimestamp()
      await notifService.removeNotif(notifId)
      await notifService.addNotif(userId, friendId, 'new-friend', timestamp)
      await notifService.addNotif(friendId, userId, 'new-friend', timestamp)
      
      res.locals = {
        notifs: [
          {initiatorId: userId, receiverId: friendId, type:'new-friend', timestamp},
          {initiatorId: friendId, receiverId: userId, type:'new-friend', timestamp}
        ]
      }
      res.send(serviceResult)
      next()
    } catch (err) {
      next(err)
    }
  }
}