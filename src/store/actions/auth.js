import AuthService from '../../Services/AuthService'

export const LOGIN = 'LOGIN'
export const GOOGLE_AUTH = 'GOOGLE_AUTH'
export const REGISTER = 'REGISTER'
export const UPDATE_USER = 'UPDATE_USER'
export const LOGOUT = 'LOGOUT'

export const login = (params, history) => async (dispatch) => {
  try {
    const data = await AuthService.login(params)

    dispatch({ type: LOGIN, payload: data })
    history.push('/')
  } catch (e) {
    console.log({ error: e.message })
  }
}

export const googleAuth = (history) => async (dispatch) => {
  try {
    const data = await AuthService.googleAuth()

    dispatch({ type: GOOGLE_AUTH, payload: data })
    history.push('/')
  } catch (e) {
    console.log({ error: e.message })
  }
}

export const register = (params, history) => async (dispatch) => {
  try {
    const data = await AuthService.register(params)

    dispatch({ type: REGISTER, payload: data })
    history.push('/')
  } catch (e) {
    console.log(e.message)
  }
}

export const updateUser = (params) => async (dispatch) => {
  try {
    const data = await AuthService.update(params)

    dispatch({ type: UPDATE_USER, payload: data })
  } catch (e) {
    console.error(e.message)
  }
}

export const logOut = () => dispatch => {
  AuthService.logout()
  dispatch({ type: LOGOUT })
}
