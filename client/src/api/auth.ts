import axios from 'axios'
import { setTokenHeader } from './header'

const baseURL = 'http://localhost:8088/api/auth'

export const RegisterApi = async (email: string, name: string, username: string, password: string) => {
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
export const LoginApi = async (username: string, password: string) => {
  const url = baseURL + '/login'

  try {
    const res = await axios.post(url, {
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