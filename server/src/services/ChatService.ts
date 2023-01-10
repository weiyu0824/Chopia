import { PrivateMessage } from '../models/PrivateMessage'
import { AccessDatabaseError, HttpException } from '../utils/HttpException'
import { GetMessageResult, initGetMessageResult, 
        SendMessageResult, initSendMessageResult } from '../interfaces/service.interface'

export class ChatService {
  static calculateChatRoomId(user1Id: string, user2Id: string): string {
    return (user1Id < user2Id) ? `${user1Id}${user2Id}` : `${user2Id}${user1Id}`
  }

  getMessages = async (
    userId: string, 
    friendUserId: string
  ): Promise<GetMessageResult> => {
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
      throw new AccessDatabaseError()
    }
  }

  sendMessages = async (
    senderId: string, 
    friendUserId: string, 
    messageText: string, 
    timestamp: string
  ): Promise<SendMessageResult> => {
    try {
      const chatRoomId = ChatService.calculateChatRoomId(senderId, friendUserId)
      const privateMessage = new PrivateMessage({
        chatRoomId: chatRoomId,
        messageText: messageText,
        senderId: senderId,
        timestamp: timestamp
      })
      console.log(privateMessage)
      privateMessage.save()
      // TODO: check return type
      return initSendMessageResult({
        success: true,
        message: 'Successfully send the message'
      })
    } catch (err) {
      throw new AccessDatabaseError()
    }
  }
}
