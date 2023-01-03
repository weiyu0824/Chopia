import axios from 'axios'
import { setTokenHeader } from './header'

const baseURL = 'http://localhost:8088/api/user'

const changePassword = async (
  oldPassword: string, 
  newPassword: string, 
  accessToken: string) => {

}

const editProfile = async (
  name: string, 
  username: string,
  avatar: string, 
  accessToken: string) => {
  const url = `${baseURL}/edit-profile`

  try {
    const headerConfig = setTokenHeader(accessToken)
    const putData = {
      name: name,
      username: username, 
      avatar: avatar
    }
    console.log(putData)
    const res = await axios.put(url, putData, headerConfig)
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

export {
  changePassword,
  editProfile
}