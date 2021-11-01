/* eslint-disable no-unused-vars */
import { LOGIN, REGISTER, LOGOUT, GOOGLE_AUTH, UPDATE_USER } from '../actions/auth'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!JSON.parse(localStorage.getItem('user'))
}

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN:

      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }
    case GOOGLE_AUTH:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }
    case REGISTER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true
      }
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      }
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: '',
        isLoggedIn: false
      }
    default:
      return {
        ...state
      }
  }
}

export default AuthReducer
