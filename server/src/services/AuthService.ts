import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config'
import { User } from '../models/User'
import { UserVerification } from '../models/UserVerification'
import { HttpException, AccessDatabaseError, AlreadyLogoutError, WrongDataError } from '../utils/HttpException'
import { TokenPayload } from '../interfaces/TokenPayload'
import { initRegisterResult, RegisterResult, 
          initLoginResult, LoginResult, 
          initRefreshResult, RefreshResult, 
          initLogoutResult, LogoutResult,
          initLoginWithTokenResult, LoginWithTokenResult,
          FriendInfo} from '../interfaces/service.interface'

// class TokenMemory {
//   static genAccessToken() {
//     return ''
//   }
//   constructor(){}
// }

export class AuthService {
  // TODO: put this to in-memory DB
  // TODO: Verify if this should only store refresh token
  private loggedinUsers = new Map<string, string>()

  constructor() { }

  genAccessToken(payload: TokenPayload) {
    // const token: string = jwt.sign(payload, config.token.accessSecret, { expiresIn: config.token.accessTokenDuration })
    const token: string = jwt.sign(payload, config.token.accessSecret)
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

  storeRefreshToken(userId: string, refreshToken: string) {
    this.loggedinUsers.set(userId, refreshToken)
  }

  removeRefreshToken(verifiedName: string) {
    // return True if this user already logged-in,
    // otherwise return False
    return this.loggedinUsers.delete(verifiedName) 
  }

  // Services
  register = async (
    email: string, 
    name: string, 
    username: string, 
    password: string
  ): Promise<RegisterResult> => {
    try {
      const emailExist = await User.findOne({
        email: email
      })
      if (emailExist !== null) {
        return initRegisterResult({
          success: false,
          message: 'The email has already linked to an account'
        })
      }

      const usernameExist = await User.findOne({
        username: username
      })
      if (usernameExist !== null) {
        return initRegisterResult({
          success: false,
          message: 'The username has already existed, please try another'
        })
      }

      const user = new User({
        email: email,
        name: name,
        username: username,
        password: password,
        avatar: 'standard',
        verify: false
      })
      console.log('store')
      const newUser = await user.save()

      // TODO: email verify
      return initRegisterResult({
        success: true,
        message: 'Succesfully create the user',
        userId: newUser._id.toString()
      })
    } catch (err) {
      
      throw new AccessDatabaseError()
    }
  }

  test = async () => {
    throw new Error('test error')
  }
  login = async (
    email: string, 
    password: string
  ): Promise<LoginResult> => {

    try {
      const existUser = await User.findOne({
        email: email,
        password: password
      })
      console.log(existUser)
      if (existUser !== null && existUser.verify) {
        const userId = existUser._id.toString()
        console.log(userId)
        const accessToken = this.genAccessToken({ userId: userId})
        const refreshToken = this.genRefreshToken({  userId: userId})
        this.storeRefreshToken(userId, refreshToken)
        console.log(existUser)

        const friendInfos: Array<FriendInfo> = []
        for (const friendId of existUser.friendIds) {
          const friend = await User.findById(friendId)
          if (friend === null) {
            throw new AccessDatabaseError()
          }
          friendInfos.push({
            userId: friendId,
            name: friend.name,
            username: friend.username,
            avatar: friend.avatar,
          })
        }
        return initLoginResult({
          success: true,
          message: 'Login successfully',
          accessToken: accessToken,
          refreshToken: refreshToken,
          userId: userId,
          email: existUser.email,
          name: existUser.name,
          username: existUser.username,
          avatar: existUser.avatar,
          friendInfos: friendInfos
        }) 
      } else if (existUser !== null && !existUser.verify){
        return initLoginResult({
          success: true,
          userId: existUser._id.toString(),
          verify: false
        })
      } else {
        return initLoginResult({
          success: false,
          message: 'Please provide a valid email address and password.'
        })
      }
    } catch (err) {
      throw new AccessDatabaseError()
    }
  }

  logout = (verifiedName: string): LogoutResult => {
    // delete token
    if (this.removeRefreshToken(verifiedName)) {
      return initLogoutResult({
        success: true,
        message: 'Succeesfully log out'
      })
    } else {
      throw new AlreadyLogoutError()
      
    }
  }

  refresh = (verifiedName: string): RefreshResult => {

    // const decodedToken = jwt.verify(refreshToken, config.token.refreshSecret)
    // const accessToken = this.genAccessToken(decodedToken.)

    // if (this.checkIsLoggedIn(verifiedName)){
    //   const accessToken = this.genAccessToken({ name: verifiedName })
    //   return {
    //     success: true,
    //     accessToken: accessToken
    //   }
    // } else {
    //   return {
    //     error: new AlreadyLogoutError()
    //   }
    // }
    throw new AlreadyLogoutError()
    
  } // token
    
  loginWithToken = async (
    userId: string
  ): Promise<LoginWithTokenResult> => {
    try{
      const existUser = await User.findById(userId)
      if (existUser !== null) {
        const friendInfos: Array<FriendInfo> = []
        for (const friendId of existUser.friendIds) {
          const friend = await User.findById(friendId)
          if (friend === null) {
            throw new AccessDatabaseError()
          }
          friendInfos.push({
            userId: friendId,
            name: friend.name,
            username: friend.username,
            avatar: friend.avatar,
          })
        }
        return initLoginWithTokenResult({
          success: true,
          message: 'Login successfully',
          userId: userId,
          email: existUser.email,
          name: existUser.name,
          username: existUser.username,
          avatar: existUser.avatar,
          friendInfos: friendInfos
        }) 
      }else {
        return initLoginResult({
          success: false,
          message: 'Wrong userId, please logout!'
        })
      }

    } catch(err) {
      throw new AccessDatabaseError()
    }
  }

  verify = async (
    userId: string,
    verificationToken: string
  ) => {
    const user = await User.findOne({_id: userId})
    console.log(user)
    if (!user) {
      return {
        success: false,
        message: 'This user does not exist!!'
      }
    }
    if (user.verify) {
      return {
        success: false,
        message: 'this email address have already been verified'
      }
    }
    const currDate = Date.now() / 1000
    // 86,400 seconds per day
    const userVerification = await UserVerification.findOneAndDelete({
      userId: userId,
      verificationToken: verificationToken
    })
    console.log(userVerification)
    if (!userVerification) {
      throw new WrongDataError()
    } else {
      // if (currDate < userVerification.expireDate) {
        await User.findOneAndUpdate({_id: userId}, {verify: true})
        return {
          success: true,
          message: ''
        }
      // }
    }
    return {}
  }

  storeVerfication = async (
    userId: string,
  ) => {
    const token = uuidv4()
    const userVerification = new UserVerification({
      userId: userId,
      verificationToken: token,
      expireDate: (Date.now() / 1000) + 864000
    })

    // link:
    console.log(`Verification Link: http://localhost:3000/verify?id=${userId}&token=${token}`)
    try {
      await userVerification.save()
      return userVerification
    } catch (err) {
      throw err
    }
  }
}
