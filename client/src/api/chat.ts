import axios from 'axios'
import { setTokenHeader } from './header'
import config from '../config/config'


const baseURL = `http://${config.ip}:8088/api/chat`

export const getChat = async (friendId: string, accessToken: string) => {
  const url = `${baseURL}/private/${friendId}`
  try {
    const headerConfig = setTokenHeader(accessToken)
    const res = await axios.get(url, headerConfig)
    return {
        data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}
