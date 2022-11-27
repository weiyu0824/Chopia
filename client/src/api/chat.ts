import { Header } from 'antd/lib/layout/layout'
import axios from 'axios'
import { setTokenHeader } from './header'
import { Message } from '../utils/Message'

const baseURL = 'http://localhost:8088/api/chat'

export const GetChatApi = async (friendUsername: string, accessToken: string) => {
  const url = `${baseURL}/${friendUsername}`
  console.log(friendUsername)
  console.log(accessToken)
  try {
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

export const SendMessageAPI = async (friendUsername: string, message: Message, accessToken: string) => {
  const url = `${baseURL}/private`

  try {
    const headerConfig = setTokenHeader(accessToken)
    const postData = {
      friendUsername: friendUsername,
      message: message
    }
    axios.post(url, postData, headerConfig)
    
  } catch (err) {
    return {
      err: err
    }
  }
}