import API from './api'

const AuthService = {
  login: async (params) => {
    try {
      const user = await API.post('/login', params)

      setHeaderStorage(user.data)
      return user.data
    } catch (e) {
      console.error(e.message)
    }
  },
  googleAuth: async () => {
    try {
      const user = await API.get('/auth/google/get', { withCredentials: true })
      setHeaderStorage(user.data)
      return user.data
    } catch (e) {
      console.error(e.message)
    }
  },
  register: async (params) => {
    try {
      const user = await API.post('/register', params)

      setHeaderStorage(user.data)
      return user.data
    } catch (e) {
      console.log(e.message)
    }
  },
  update: async (params) => {
    try {
      const user = await API.post('/update', params)

      localStorage.setItem('user', JSON.stringify(user.data))
      return user.data
    } catch (e) {
      console.error(e.message)
    }
  },
  logout: async () => {
    API.defaults.headers.Authorization = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('entornos')
    localStorage.removeItem('actividades')
    const res = await API.get('/logout', { withCredentials: true })
    console.log(res)
  }
}

const setHeaderStorage = ({ user, token }) => {
  API.defaults.headers.Authorization = `Bearer ${token}`
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

export default AuthService
