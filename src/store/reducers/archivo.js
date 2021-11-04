/* eslint-disable no-unused-vars */
import { CREAR_ARCHIVO, OBTENER_ARCHIVO, ELIMINAR_ARCHIVO } from '../actions/archivo'

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
    case ELIMINAR_ARCHIVO:
      return {
        ...state,
        archivo: {}
      }
    default:
      return state
  }
}

export default ArchivoReducer
