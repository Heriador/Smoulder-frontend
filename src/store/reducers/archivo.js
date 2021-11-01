/* eslint-disable no-unused-vars */
import { CREAR_ARCHIVO, OBTENER_ARCHIVO } from '../actions/archivo'

const initialState = {
  archivo: {}
}

const ArchivoReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CREAR_ARCHIVO:
      return {
        ...state,
        archivo: payload
      }
    case OBTENER_ARCHIVO:
      return {
        ...state,
        archivo: payload
      }
    default:
      return state
  }
}

export default ArchivoReducer
