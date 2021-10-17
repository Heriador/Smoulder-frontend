import { LOGIN, REGISTER, LOGOUT } from "../actions/chat";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    isLoggedIn: !!JSON.parse(localStorage.getItem('user'))
}

const AuthReducer = (state = initialState, action) => {

    const {type, payload}= action
    console.log(action);

    switch (type) {
        case LOGIN:
            
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
        case LOGOUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }
        default:
            return {
                ...state
            }
    }

}


export default AuthReducer