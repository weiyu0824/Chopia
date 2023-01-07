import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { validateToken } from '../middlewares/TokenValidation'
import { ChatService } from '../services/ChatService'
import { InvalidAPIError } from '../utils/HttpException'



const chatService = new ChatService()

export class ChatController implements Controller {
  public path = '/chat'
  public router = Router()

  constructor() {
    this.initRouter()
  }
  private initRouter() {
    this.router.get('/private/:friendUserId', validateToken, this.getPrivateMessage)
    this.router.post('/group')
  }

  getPrivateMessage = async (req: Request, res: Response, next: NextFunction) => {
    // get token and page id here
    const userId = req.body.userId
    const friendUserId = req.params.friendUserId

    console.log('get private message')
    if (friendUserId === undefined){
      next(new InvalidAPIError())
    } else {
      const serviceResult = await chatService.getMessages(userId, friendUserId)
      if (!serviceResult.error) {
        res.send(serviceResult)
      } else {
        next(serviceResult.error)
      }
    }
  }

  // sendPrivateMessage = async (req: Request, res: Response, next: NextFunction) => {
  //   console.log("Send private message")
  //   const username = req.body.verifiedName
  //   const friendUsername = req.body.friendUsername
  //   const message = req.body.message

  //   const serviceResult = await chatService.sendMessages(username, friendUsername, message)

  //   if (!serviceResult.error) {
  //     res.send(serviceResult)
  //   } else {
  //     next(serviceResult.error)
  //   }
  
  // }
}
