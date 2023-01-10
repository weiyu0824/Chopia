import axios from 'axios'
import { setTokenHeader } from './header'

const baseURL = 'http://localhost:8088/api/ml'

export const getSummary = async (friendId: string, accessToken: string) => {
  const url = `${baseURL}/summary/${friendId}`
  console.log(friendId)
  console.log(accessToken)
  try {
    const headerConfig = setTokenHeader(accessToken)
    const res = await axios.get(url, headerConfig)
    console.log(res)

    return {
        data: res.data
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log('is axios error')
      if (!err?.response) {
        console.log("No Server Response");
      } 
    }
    return {}
  }
}