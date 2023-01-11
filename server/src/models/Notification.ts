import { Schema, model } from 'mongoose'
import { INotification } from '../interfaces/model.interface'

const notifSchema = new Schema<INotification>({
  initiatorId: { type: String, required: true },
  receiverId: { type: String, required: true },
  type: { type: String, required: true },
  timestamp: { type: String, required: true },
})
// notifSchema.virtual('notifId').get(function(){
//   return this._id
// })
notifSchema.set('toJSON', {
  virtuals: true
});

export const Notification = model<INotification>('notification', notifSchema)
