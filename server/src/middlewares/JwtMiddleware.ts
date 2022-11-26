import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Request, Response, NextFunction } from 'express'
import { InvalidTokenError, NoTokenError } from '../utils/HttpException'
import { TokenPayload } from '../interfaces/TokenPayload'

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    next(new NoTokenError())
    return
  }

  try {
    const decoded = jwt.verify(token, config.token.accessSecret) as TokenPayload
    console.log('jwt verified (v)')
    req.body.verifiedName = decoded.name // TODO: Set in other pos
    next()
  } catch (err) {
    next(new InvalidTokenError())
  }
  
  return
}
