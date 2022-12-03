import jwt from 'jsonwebtoken'
import config from '../config/config'
import { User } from '../models/User'
import { HttpException, AccessDatabaseError, AlreadyLogoutError } from '../utils/HttpException'
import { TokenPayload } from '../interfaces/TokenPayload'

interface ServiceResult {
  error?: HttpException
  success?: boolean
  message?: string
  accessToken?: string
  refreshToken?: string
}

export class AuthService {
  // TODO: put this to in-memory DB
  // TODO: Verify if this should only store refresh token
  private loggedinUsers = new Map<string, string>()

  constructor() { }

  genAccessToken(payload: TokenPayload) {
    const token: string = jwt.sign(payload, config.token.accessSecret, { expiresIn: config.token.accessTokenDuration })
    return token
  }

  genRefreshToken(payload: TokenPayload) {
    const token: string = jwt.sign(payload, config.token.refreshSecret)
    return token
  }

  // TODO: Operate on In-memory DB
  checkIsLoggedIn(verifiedName: string) {
    return this.loggedinUsers.has(verifiedName)
  }
  // TODO: this refresh token should be the latest one
  checkIsUpdatedToken(verifiedName: string) {

  }

  storeRefreshToken(username: string, refreshToken: string) {
    this.loggedinUsers.set(username, refreshToken)
  }

  removeRefreshToken(verifiedName: string) {
    // return True if this user already logged-in,
    // otherwise return False
    return this.loggedinUsers.delete(verifiedName) 
  }

  // Services
  register = async (username: string, password: string): Promise<ServiceResult> => {
    try {
      const exist = await User.findOne({
        username: username
      })
      if (exist !== null) {
        return {
          success: false,
          message: 'The username has already existed'
        }
      }

      const user = new User({
        username: username,
        password: password
      })

      await user.save()
      return {
        success: true,
        message: 'Succesfully create the user'
        // TODO: email verify
      }
    } catch (err) {
      return {
        error: new HttpException(500, 'Access Database Error')
      }
    }
  }

  login = async (username: string, password: string): Promise<ServiceResult> => {
    try {
      const correct = await User.findOne({
        username: username,
        password: password
      })
      if (correct !== null) {
        const accessToken = this.genAccessToken({ name: username })
        const refreshToken = this.genRefreshToken({ name: username })
        this.storeRefreshToken(username, refreshToken)

        return {
          success: true,
          message: 'Login successfully',
          accessToken: accessToken,
          refreshToken: refreshToken
        }

      } else {
        return {
          success: false,
          message: 'Please provide a valid email address and password.'
        }
      }
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  logout = (verifiedName: string): ServiceResult => {
    // delete token
    if (this.removeRefreshToken(verifiedName)) {
      return {
        success: true,
        message: 'Succeesfully log out'
      }
    } else {
      return {
        error: new AlreadyLogoutError()
      }
    }
  }

  refresh = (verifiedName: string): ServiceResult => {

    // const decodedToken = jwt.verify(refreshToken, config.token.refreshSecret)
    // const accessToken = this.genAccessToken(decodedToken.)

    if (this.checkIsLoggedIn(verifiedName)){
      const accessToken = this.genAccessToken({ name: verifiedName })
      return {
        success: true,
        accessToken: accessToken
      }
    } else {
      return {
        error: new AlreadyLogoutError()
      }
    }

  } // token
}
