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
  }

  private searchUser = async (req: Request, res: Response, next: NextFunction) => {
    await setTimeout(1000)
    const email = ((req.query.email)? req.query.email : '' ) as string;
    const username = ((req.query.username)? req.query.username : '') as string;
    const serviceResult = await userService.search(email, username)
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

  private addFriend = async (req: Request, res: Response, next: NextFunction) => {
    // send request
    // 1. write to notification DB
    // 2. send 'friend request' notif to user

    const userId = req.body.userId
    const friendId = req.body.friendId
    const type = 'friend-request'
    const timestamp = getCurrTimestamp()
    const serviceResult = await notifService.addNotif(userId, friendId, type, timestamp)
    if (!serviceResult.error) {
      res.json(serviceResult)
      res.locals = {
        notifs: [
          {initiatorId: userId, receiverId: friendId, type, timestamp},
        ] 
      }
      next()
    }else {
      next(serviceResult.error)
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
    const serviceResult = await userService.addFriend(userId, friendId)

    if (!serviceResult.error) {
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
    } else {
      next(serviceResult.error)
    }
  }
}