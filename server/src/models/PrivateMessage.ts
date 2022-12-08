import { Schema, model } from 'mongoose'
import { IPrivateMessage } from '../interfaces/IPrivateMessage'

const privateMessageSchema = new Schema<IPrivateMessage>({
    chatRoomId: { type: String, required: true },
    messageText: { type: String, required: true },
    senderUsername: { type: String, required: true },
    time: {type: String, required: true}
})

export const PrivateMessage = model<IPrivateMessage>('PrivateMessage', privateMessageSchema)
