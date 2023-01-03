import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Request, Response, NextFunction } from 'express'
import { InvalidTokenError, NoTokenError } from '../utils/HttpException'
import { TokenPayload } from '../interfaces/TokenPayload'

export function validateToken(req: Request, res: Response, next: NextFunction) {
  console.log('Validate token...')
  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    console.log('no token error')
    next(new NoTokenError())
    return
  }
  console.log(token)
  try {
    const decoded = jwt.verify(token, config.token.accessSecret) as TokenPayload
    console.log('[v] JWT is verified ')
    req.body.userId = decoded.userId // TODO: Set in other pos
    next()
  } catch (err) {
    next(new InvalidTokenError())
  }
}

export function refreshMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    next(new NoTokenError())
    return
  }

  try {
    const decoded = jwt.verify(token, config.token.refreshSecret) as TokenPayload
    console.log('jwt verified (v)')
    req.body.verifiedName = decoded.name // TODO: Set in other pos
    next()
  } catch (err) {
    next(new InvalidTokenError())
  }
}
