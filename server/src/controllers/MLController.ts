import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { ChatService } from '../services/ChatService'
import { InvalidAPIError } from '../utils/HttpException'
import { jwtMiddleware } from '../middlewares/JwtMiddleware'
import { MLService } from '../services/MLService'

const mlService = new MLService()

export class MLController implements Controller {
  public path = '/ml'
  public router = Router()

  constructor() {
    this.initRouter()
  }
  private initRouter() {
    this.router.get('/summary/:friendUsername', jwtMiddleware, this.getSummary)
  }
  private getSummary = async (req: Request, res: Response, next: NextFunction) => {

    // get token and page id here
    const username = req.body.verifiedName
    const friendUsername = req.params.friendUsername
    if (friendUsername === undefined){
      next(new InvalidAPIError())
    } else {
      const chatRoomId = ChatService.calculateChatRoomId(username, friendUsername)
      const prediction = await mlService.getSummary(chatRoomId)
      res.send(prediction)
    }
  }
}
