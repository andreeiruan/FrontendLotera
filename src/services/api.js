import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(async req => {
  const token = getToken()
  if(token){
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default api