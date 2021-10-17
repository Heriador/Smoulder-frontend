import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3002',
    headers: {
        'Accept': 'aplication/json',
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