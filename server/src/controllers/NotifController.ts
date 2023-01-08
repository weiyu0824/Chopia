import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { validateToken } from '../middlewares/TokenValidation'
import { NotifService } from '../services/NotifService'
import { InvalidAPIError } from '../utils/HttpException'

const notifService = new NotifService()

export class NotifController implements Controller {
  public path = '/notif'
  public router = Router()

  constructor() {
    this.initRouter()
  }

  private initRouter() {
    this.router.get('', validateToken, this.getNotifs)
    this.router.delete('/:notifId', validateToken, this.removeNotif)
  }

  private getNotifs = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId
    const serviceResult = await notifService.getNotifs(userId)
    if (!serviceResult.error) {
      res.json(serviceResult)
    } else {
      next (serviceResult.error)
    }
  }

  private removeNotif = async (req: Request, res: Response, next: NextFunction) => {
    // 1. remove the notif from the notification DB
    const notifId = req.params.notifId

    console.log(notifId)
    if (!notifId){
      next(new InvalidAPIError())
    } else {
      const serviceResult = await notifService.removeNotif(notifId)
      if (!serviceResult.error) {
        res.json(serviceResult)
      } else {
        next (serviceResult.error)
      }
    }
  }
}