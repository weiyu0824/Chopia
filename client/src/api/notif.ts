import axios from 'axios'
import { setTokenHeader } from './header'
import config from '../config/config'

const baseURL = `http://${config.ip}:8088/api/notif`

export const getNotifs = async (
  accessToken: string) => {
  const url =`${baseURL}`
  try{
    console.log('get notif')
    const headerConfig = setTokenHeader(accessToken)
    const res = await axios.get(url, headerConfig)
    console.log(res)
    return {
      data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}

export const deleteNotif = async (
  notifId: string,
  accessToken: string
) => {
  try{
    const url = `${baseURL}/${notifId}`
    console.log(url)
    console.log('delete notif')
    const headerConfig = setTokenHeader(accessToken)
    const res = await axios.delete(url, headerConfig)
    return {
      data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}
