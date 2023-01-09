import { Router, Response, Request, NextFunction } from 'express'
import { Controller } from '../interfaces/Controller'
import { validateToken } from '../middlewares/TokenValidation'
import { ChatService } from '../services/ChatService'
import { InvalidAPIError } from '../utils/HttpException'
import { setTimeout } from 'timers/promises'

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
    await setTimeout(500)
    // get token and page id here
    const userId = req.body.userId
    const friendUserId = req.params.friendUserId

    if (friendUserId === undefined){
      next(new InvalidAPIError())
      return
    } 

    try {
      const serviceResult = await chatService.getMessages(userId, friendUserId)
    } catch (err) {
      next(err)
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
