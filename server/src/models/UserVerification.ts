import { Schema, model } from 'mongoose'
import { IUserVerification } from '../interfaces/model.interface'

const userVerificationSchema = new Schema<IUserVerification>({
  userId: { type: String, required: true },
  verificationToken: { type: String, required: true },
  expireDate: {type: Number, required: true}
})
              
export const UserVerification = model<IUserVerification>('UserVerification', userVerificationSchema)
