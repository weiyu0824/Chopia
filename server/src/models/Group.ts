import { Schema, model } from 'mongoose'
import { IGroup } from '../interfaces/model.interface'

const groupSchema = new Schema<IGroup>({
  groupName: { type: String, required: true},
  adminId: { type: String, required: true },
  memberIds: { type: [String], required: true },
  avatar: String
})
              
export const User = model<IGroup>('Group', groupSchema)