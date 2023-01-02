import { setDefaultResultOrder } from 'dns'
import App from '../App'
import { ChatService } from '../services/ChatService'
import { getCurrentTimeStamp } from '../utils/time'
// const test = App.testStr
const chatService = new ChatService()
// const chatServer = App.chatServer

export class ChatHandler {
  public receiveMessage(senderId, friendId, messageText) {
    // 1. write to DB (Mark the timestamp here)
    const timestamp = getCurrentTimeStamp()
    chatService.sendMessages(senderId, friendId, messageText, timestamp)
    // 2. send to other user
    const message = {
      senderId: senderId,
      messageText: messageText,
      timestamp: timestamp,
    }
    // chatServer.sendMessage(message, friendId)
    // 3. if other is off line push to notification ()


    return message
  }

  public receiveGroupMessage(senderId, chatroomId, messageText) {

  }
}