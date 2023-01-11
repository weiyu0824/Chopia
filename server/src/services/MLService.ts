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
        return {
          success: false,
          message: 'Your should have over 5 messages to generate summary' 
        }
      }
      console.log('gen')
      const prediction = await inference(chatMessages)
      return {
        success: true,
        message: '',
        prediction: prediction
      }
    } catch (err) {
      throw (err)
    }

  }   
}
