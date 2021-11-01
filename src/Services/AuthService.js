import API from './api'

const AuthService = {
  login: async (params) => {
    const user = await API.post('/login', params)

    setHeaderStorage(user.data)
    return user.data
  },
  googleAuth: async () => {
    const user = await API.get('/auth/google/get', { withCredentials: true })
    console.log(user)
    // if(user.data) {
    setHeaderStorage(user.data)
    return user.data
    // }
  },
  register: async (params) => {
    const user = await API.post('/register', params)

    setHeaderStorage(user.data)
    return user.data
  },
  update: async (params) => {
    const user = await API.post('/update', params)

    console.log('Usuario actualizdo', user.data)
    // setHeaderStorage(user.data)
    localStorage.setItem('user', JSON.stringify(user.data))
    return user.data
  },
  logout: async () => {
    API.defaults.headers.Authorization = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
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
