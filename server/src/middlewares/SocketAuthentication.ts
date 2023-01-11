import jwt from 'jsonwebtoken'
import config from '../config/config'
import { TokenPayload } from '../interfaces/TokenPayload'

export function authenticate(token) {
  console.log('validating token')
  try {
    const decoded = jwt.verify(token, config.token.accessSecret) as TokenPayload
    console.log('jwt verified (v)')
    return decoded.userId
  } catch (err) {
    return ''
  }
}