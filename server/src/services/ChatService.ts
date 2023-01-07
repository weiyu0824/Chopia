import { PrivateMessage } from '../models/PrivateMessage'
import { HttpException } from '../utils/HttpException'
import { ServiceError } from '../interfaces/service.interface'
import { GetMessageResult, initGetMessageResult, 
        SendMessageResult, initSendMessageResult } from '../interfaces/service.interface'
import e from 'express'

export class ChatService {
  static calculateChatRoomId(user1Id: string, user2Id: string): string {
    return (user1Id < user2Id) ? `${user1Id}${user2Id}` : `${user2Id}${user1Id}`
  }

  getMessages = async (
    userId: string, 
    friendUserId: string
  ): Promise<ServiceError | GetMessageResult> => {
    try {
      const chatRoomId = ChatService.calculateChatRoomId(userId, friendUserId)
      const messages = await PrivateMessage.find({
        chatRoomId: chatRoomId
      }).select('messageText senderId timestamp')
 
      if (chatRoomId === null) {
        return initGetMessageResult({
          success: true,
          chatMessages: []
        })
      }else {
        return initGetMessageResult({
          success: true,
          chatMessages: messages
        })
      }
    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }
  }

  sendMessages = async (
    senderId: string, 
    friendUserId: string, 
    messageText: string, 
    timestamp: string
  ): Promise<ServiceError | SendMessageResult> => {

    try {
      const chatRoomId = ChatService.calculateChatRoomId(senderId, friendUserId)
      const privateMessage = new PrivateMessage({
        chatRoomId: chatRoomId,
        messageText: messageText,
        senderId: senderId,
        timestamp: timestamp
      })
      privateMessage.save()
      // TODO: check return type
      return initSendMessageResult({
        success: true,
        message: 'Successfully send the message'
      })
    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }
  }
}
