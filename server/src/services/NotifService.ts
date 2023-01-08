import { ServiceError } from '../interfaces/service.interface'
import { Notification } from '../models/Notification'
import { User } from '../models/User'
import { AccessDatabaseError } from '../utils/HttpException'
import { ServiceResult, initServiceResult,
        AddFriendResult, initAddFriendresult,
        GetNotifsResult, initGetNotifsResult} from '../interfaces/service.interface'
import { NotifInfo, FriendInfo } from '../interfaces/service.interface'

export class NotifService {

  constructor() { }

  getNotifs = async (
    userId: string
  ): Promise<ServiceError | GetNotifsResult> => {
    try {
      let notifs = await Notification.find({ receiverId: userId })
      console.log(notifs)

      interface CompleteNotifInfo extends NotifInfo{
        initiatorInfo: FriendInfo
      }
      const completeNotifs: CompleteNotifInfo[] = []
      for (const notif of notifs){
        const initiatorId = notif.initiatorId
        const userInfo = await User.findById(initiatorId)
        if (userInfo) {
          completeNotifs.push({
            notifId: notif._id.toString(),
            initiatorId: notif.initiatorId,
            receiverId: notif.receiverId,
            type: notif.type,
            timestamp: notif.timestamp,
            initiatorInfo: {
              userId: userInfo._id.toString(),
              username: userInfo.username,
              avatar: userInfo.avatar,
              name: userInfo.name
            }
          })
        }
      }
      
      return initGetNotifsResult({
        success: true,
        notifs: completeNotifs
      })        
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  addNotif = async (
    initiatorId: string,
    receiverId: string,
    type: 'friend-request' | 'new-friend',
    timestamp: string
  ): Promise<ServiceError | AddFriendResult> => {
    console.log('add notif')
    try {
      if (type === 'friend-request'){
        console.log('find exist')
        const existNotif = await Notification.find({initiatorId: initiatorId, receiverId: receiverId})
        console.log(existNotif)
        if (existNotif.length !== 0){
          console.log('correct find')
          return initAddFriendresult({
            success: false,
            message: 'You have sent invitation before'
          })
        }
      }
      const notification = new Notification({
        initiatorId,
        receiverId,
        type,
        timestamp
      })
      notification.save()
      return initAddFriendresult({
        message: 'Your friend request has been sent'
      })
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }

  removeNotif = async (
    notifId: string
  ): Promise<ServiceError | ServiceResult> => {
    try {
      await Notification.deleteOne({_id: notifId})
      return initServiceResult({
        message: 'successfully remove the notification'
      })      
    } catch (err) {
      return {
        error: new AccessDatabaseError()
      }
    }
  }
}
