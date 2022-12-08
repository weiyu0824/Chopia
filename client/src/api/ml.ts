import axios from 'axios'
import { setTokenHeader } from './header'

const baseURL = 'http://localhost:8088/api/ml'

export const GetSummaryapi = async (friendUsername: string, accessToken: string) => {
  const url = `${baseURL}/summary/${friendUsername}`
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