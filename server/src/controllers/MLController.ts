import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { ChatService } from '../services/ChatService'
import { InvalidAPIError } from '../utils/HttpException'
import { validateToken } from '../middlewares/TokenValidation'
import { MLService } from '../services/MLService'

const mlService = new MLService()

export class MLController implements Controller {
  public path = '/ml'
  public router = Router()

  constructor() {
    this.initRouter()
  }
  private initRouter() {
    this.router.get('/summary/:friendId', validateToken, this.getSummary)
  }
  private getSummary = async (req: Request, res: Response, next: NextFunction) => {

    // get token and page id here
    const userId = req.body.userId
    const friendId = req.params.friendId
    if (friendId === undefined){
      next(new InvalidAPIError())
      return 
    }
    try {
      const chatRoomId = ChatService.calculateChatRoomId(userId, friendId)
      const prediction = await mlService.getSummary(chatRoomId)
      res.send(prediction)
      next()
    } catch (err) {
      console.log('get summary got error')
      next(err)
    }
  }
}
