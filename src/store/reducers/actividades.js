/* eslint-disable no-unused-vars */
import { CREAR_ACTIVIDAD, CREAR_ANUNCIO, OBTENER_ACTIVIDADES } from '../actions/actividades'

const initialState = {
  actividades: JSON.parse(localStorage.getItem('actividades')) || []
}

const ActividadesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CREAR_ANUNCIO:
      return {
        ...state,
        actividades: [
          payload,
          ...state.actividades
        ]
      }

    case CREAR_ACTIVIDAD:

      return {
        ...state,
        actividades: [
          payload,
          ...state.actividades
        ]
      }

    case OBTENER_ACTIVIDADES:
      return {
        ...state,
        actividades: payload.data.reverse()
      }
    default:
      return state
  }
}

export default ActividadesReducer
