import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
  headers: {
    Accept: 'aplication/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
})

API.interceptors.response.use(
  res => {
    return res
  },
  err => {
    throw err
  }
)

export default API
