import { HttpException, AccessDatabaseError, AlreadyLogoutError, WrongDataError } from '../utils/HttpException'
import { initSearchResult, SearchResult,
        initAddFriendresult, AddFriendresult,
        initEditProfileResult, EditProfileResult,
        initChangePasswordResult, ChangePasswordResult} from '../interfaces/service.interface'
import { User } from '../models/User'

interface ServiceError {
  error: HttpException
}

export class UserService {
  search = async (
    email: string, 
    username: string
  ): Promise<ServiceError | SearchResult> => {
    try {
      const condition = (email !== '') ? { email: email } : { username: username }
      const existUser = await User.findOne(condition)

      if (existUser !== null) {
        return initSearchResult({
          success: true,
          userId: existUser._id.toString(),
          name: existUser.name,
          username: existUser.username,
          avatar: existUser.avatar
        })
      } else {
        return initSearchResult({
          success: false,
          message: 'Sorry, we cannot find this user'
        })
      }

    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  addFriend = async (
    userId: string,
    friendUserId: string
  ): Promise<ServiceError | AddFriendresult> =>   {
    try {
      const user = await User.findById(userId)
      const friend = await User.findById(friendUserId)
      if (user === null || friend === null) {
        return {
          error: new WrongDataError()
        }
      } else {
        user.friendIds.push(friendUserId)
        friend.friendIds.push(userId)
        user.save()
        friend.save()

        // probably need to return friend profile here ??
        return initAddFriendresult({
          success: true,
          message: 'You are now friend!!'
        })
      }
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  editProfile = async (
    userId: string,
    name: string,
    username: string,
    avatar: string
  ): Promise<ServiceError | EditProfileResult> => {
    try {
      await User.updateOne({_id: userId}, {
        name: name,
        username: username,
        avatar: avatar
      })
      return initEditProfileResult({
        name: name,
        password: username,
        avatar: avatar,
        success: true,
        message: 'Update profile successfully'
      })
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  changePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<ServiceError | ChangePasswordResult> => {
    try{
      const originalPassword = await User.findById(userId).select('password')
      if (oldPassword !== oldPassword){
        return initChangePasswordResult({
          success: false,
          message: 'Your old password is wrong'
        })
      }
      await User.updateOne({_id: userId}, {
        password: newPassword,
      })
      return initChangePasswordResult({
        success: true,
        message: 'Your password has been updated!!!'
      })
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }
}
