/* eslint-disable no-unused-vars */
import { CREAR_ACTIVIDAD, OBTENER_ACTIVIDADES, ELIMINAR_ACTIVIDAD } from '../actions/actividades'

const initialState = {
  actividades: JSON.parse(localStorage.getItem('actividades')) || []
}

const ActividadesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
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

    case ELIMINAR_ACTIVIDAD:
      return {
        ...state,
        actividades: state.actividades.filter(actividad => actividad.id !== payload)
      }
    default:
      return state
  }
}

export default ActividadesReducer
