import { Schema, model } from 'mongoose'
import { IPrivateMessage } from '../interfaces/model.interface'

const privateMessageSchema = new Schema<IPrivateMessage>({
  chatRoomId: { type: String, required: true },
  messageText: { type: String, required: true },
  senderId: { type: String, required: true },
  timestamp: { type: String, required: true }
})

export const PrivateMessage = model<IPrivateMessage>('PrivateMessage', privateMessageSchema)
