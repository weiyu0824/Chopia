import { Request, Response, NextFunction } from 'express'
import { HttpException } from '../utils/HttpException'
import fs from 'fs'

export function handleError(err: HttpException, req: Request, res: Response, next: NextFunction) {
  console.error('\x1b[31m', err.message)
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(status).send({
    status, message
  })

}