import axios from 'axios'
import { setTokenHeader } from './header'
import config from '../config/config'

const baseURL = `http://${config.ip}:8088/api/user`

const changePassword = async (
  oldPassword: string, 
  newPassword: string, 
  accessToken: string) => {
  const url =`${baseURL}/change-password`
  try{
    const headerConfig = setTokenHeader(accessToken)
    const putData = {
      oldPassword: oldPassword,
      newPassword: newPassword
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
    const res = await axios.put(url, putData, headerConfig)
    return {
        data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}

const searchUser = async (
  searchStr: string,
  accessToken: string
) => {
  
  let username = ''
  let email = ''
  if (searchStr.includes('@')){
    email = searchStr
  } else {
    username = searchStr
  }
  const url = `${baseURL}/search`
  try {
    const headerConfig = setTokenHeader(accessToken)
    const searchParam = {
      params: {
        username: username,
        email: email
      }
    }
    const res = await axios.get(url, {...searchParam, ...headerConfig})
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

const addFriend = async (
  friendId: string,
  accessToken: string
) => {
  try {
    const url = `${baseURL}/add-friend`
    const headerConfig = setTokenHeader(accessToken)
    const putData = {
      friendId
    }
    const res = await axios.put(url, putData, headerConfig)
    return {
      data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}

const acceptFriend = async (
  friendId: string,
  notifId: string,
  accessToken: string
) => {
  try {
    const url = `${baseURL}/accept-friend`
    const headerConfig = setTokenHeader(accessToken)
    const putData = {
      friendId,
      notifId
    }
    const res = await axios.put(url, putData, headerConfig)
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
  editProfile,
  searchUser,
  addFriend,
  acceptFriend
}