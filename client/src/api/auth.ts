import axios from 'axios'

const baseURL = 'http://localhost:8088/api/auth'

export const login = async(username: string, password: string) => {
    const url = baseURL + '/login'
    await axios.post(url, {
        "username": username,
        "password": password
    })
}
