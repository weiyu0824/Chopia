import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/model.interface'

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  groupIds: { type: [String], default: [] },
  friendIds: { type: [String], default: []},
  avatar: { type: String, required: true },
  verify: {type: Boolean, required: true}
})
              
export const User = model<IUser>('User', userSchema)
