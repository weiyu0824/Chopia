import create from 'zustand'
import { Notification } from '../interfaces/Notification'
import { FriendInfo } from './UserInfoStore'

interface CompleteNotification extends Notification{
  initiatorInfo: FriendInfo
}
export type NotifState = {
  notificatoins: CompleteNotification[]
  newNotifCome: boolean
}

export type NotifAction = {
  addNewNotif: (notification: CompleteNotification) => void
  addOldNotification: (notification: CompleteNotification[]) => void
  removeNotif: (notifId: string) => void
}

export const useNotifStore = create<NotifState & NotifAction>()((set) => ({
  notificatoins: [],
  newNotifCome: false,
  addNewNotif: (notification: CompleteNotification) => {
    set((state) => ({
      notificatoins: [...state.notificatoins, notification]
    }))
  },
  addOldNotification: (oldNotifs: CompleteNotification[]) => {
    set((state) => ({
      notificatoins: [...oldNotifs, ...state.notificatoins]
    }))
  }, 
  removeNotif: (notifId: string) => {
    set((state) => ({
      notificatoins: state.notificatoins.filter((notif) => notif.notifId !== notifId)
    }))
  }
}))
