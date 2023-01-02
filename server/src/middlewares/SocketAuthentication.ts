import jwt from 'jsonwebtoken'
import config from '../config/config'
import { InvalidTokenError, NoTokenError } from '../utils/HttpException'
import { TokenPayload } from '../interfaces/TokenPayload'

export function authenticate(req) {
  console.log('validating token')
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.token.accessSecret) as TokenPayload
    console.log('jwt verified (v)')
    return decoded.userId
  } catch (err) {
    return ''
  }
}