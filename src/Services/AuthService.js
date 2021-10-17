import API from "./api";

const AuthService = {
    login: async (params) => {
        const user = await API.post('/login', params)

        setHeaderStorage(user.data)
        return user.data
    },
    register: async (params) => {
        const user = await API.post('/register', params)

        setHeaderStorage(user.data)
        return user.data
    }
}

const setHeaderStorage =  ({user, token}) => {

    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export default AuthService