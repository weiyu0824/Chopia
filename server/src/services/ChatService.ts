import { PrivateMessage } from '../models/PrivateMessage'
import { HttpException } from '../utils/HttpException'

interface ServiceResult {
  error?: HttpException
  messages?: Message[]
}
interface Message {
  messageText: string
  senderUsername: string
}


export class ChatService {
  calculateChatRoomId(usernameA: string, usernameB: string): string {
    if (usernameA < usernameB) {
      return usernameA + usernameB
    } else {
      return usernameB + usernameA
    }
  }

  getMessages = async (username: string, friendUsername: string): Promise<ServiceResult> => {
    try {
      const chatRoomId = this.calculateChatRoomId(username, friendUsername)
      const rawMessages = await PrivateMessage.find({
        chatRoomId: chatRoomId
      })

      console.log(rawMessages)

      const processedMessages = rawMessages.map((rawMessage, index) => {
        return {
          "messageText": rawMessage.message,
          "senderUsername": rawMessage.senderUsername
        }
      })

      return {
        messages: processedMessages
      }
    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }


  }

  sendMessages = async (username: string, friendUsername: string, message: string): Promise<ServiceResult> => {
    try {
      const chatRoomId = this.calculateChatRoomId(username, friendUsername)
      const privateMessage = new PrivateMessage({
        chatRoomId: chatRoomId,
        message: message,
        senderUsername: username
      })
      privateMessage.save()
      // TODO: check return type
      return {}

    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }
  }
}
