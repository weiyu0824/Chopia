import axios from 'axios'
import { setTokenHeader } from './header'
import config from '../config/config'

const baseURL = `http://${config.ip}:8088/api/auth`

export const register = async (email: string, name: string, username: string, password: string) => {
  const url = baseURL + '/register'

  try {
    const res = await axios.post(url, {
      "email": email,
      "name": name,
      "username": username,
      "password": password
    })
    console.log(res.data)
    return {
      data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}
export const LoginApi = async (email: string, password: string) => {
  const url = baseURL + '/login'

  try {
    const res = await axios.post(url, {
      "email": email,
      "password": password
    })
    console.log(res.data)
    return {
      data: res.data
    }
  } catch (err) {
    return {
      err: err
    }
  }
}

export const refresh = async (refreshToken: string) => {
  const url = baseURL + '/refresh'

  try {
    const headerConfig = setTokenHeader(refreshToken)
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

export const logout = () => { }


export const loginWithToken = async (accessToken: string) => {
  const url = `${baseURL}/login-with-token`
  try {
    const headerConfig = setTokenHeader(accessToken)
    const res = await axios.post(url, {}, headerConfig)
    
    return {
      data: res.data
    }
    
  } catch (err) {
    throw err
  }
}

export const verify = async (
  userId: string,
  verificationToken: string
) => {
  const url = `${baseURL}/verify`
  try {
    const postData = {
      userId,
      verificationToken
    }
    const res = await axios.post(url, postData)
    return {
      data: res.data
    }
  } catch (err) {
    throw err
  }
}
