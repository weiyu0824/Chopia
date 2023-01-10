import { PrivateMessage } from '../models/PrivateMessage'
import { inference } from '../script/inference'

export class MLService {

  constructor() { }

  getSummary = async (chatRoomId: string) => {
    try {
      const chatMessages = await PrivateMessage.find({
        chatRoomId: chatRoomId
      })
      if (chatMessages.length < 5) {
        throw new Error('Your should have over 10 messages so that we could generate summary')
      }
      const prediction = await inference(chatMessages)
      return prediction
    } catch (err) {
      throw (err)
    }

  }   
}
