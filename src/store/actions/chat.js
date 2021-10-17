import AuthService from "../../Services/AuthService";

export const LOGIN = "LOGIN";
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT'

export const login = (params, history) => async (dispatch) => {
  try {
    const data = await AuthService.login(params);

    dispatch({ type: LOGIN, payload: data });
    history.push("/");
  } catch (e) {
    console.log({ error: e.message });
  }
};

export const register = (params, history) => async (dispatch) => {

  try {

    const data = await AuthService.register(params);

    dispatch({ type: REGISTER, payload: data})
    history.push('/')
    
  } catch (e) {
    console.log(e.message)
  }


}

export const logOut = () => dispatch => {
  dispatch({ type: LOGOUT })
  console.log('entro');
}
