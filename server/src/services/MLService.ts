import { PrivateMessage } from '../models/PrivateMessage'
import { inference } from '../script/inference'

export class MLService {

  constructor() { }

  getSummary = async (chatRoomId: string) => {
    const rawMessages = await PrivateMessage.find({
      chatRoomId: chatRoomId
    })
    const prediction = await inference(rawMessages)
    return prediction
  }   
}
