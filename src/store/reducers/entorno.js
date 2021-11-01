import { ACTUALIZAR_ENTORNO, CREAR_ENTORNO, ELIMINAR_ENTORNO, FECTCH_ENTORNO, UNIRSE_ENTORNO } from '../actions/entorno'

const initialState = {
  entornos: JSON.parse(localStorage.getItem('entornos')) || []
}

const EntornoReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FECTCH_ENTORNO:
      return {
        ...state,
        entornos: payload
      }
    case CREAR_ENTORNO:
      return {
        ...state,
        entornos: [...state.entornos, payload]
      }
    case UNIRSE_ENTORNO:
      return {
        ...state,
        entornos: [...state.entornos, payload]
      }
    case ACTUALIZAR_ENTORNO:
      return {
        ...state,
        entorno: state.entornos.map(entorno => {
          if (entorno.id === payload.id) {
            return payload
          }
          return entorno
        })
      }
    case ELIMINAR_ENTORNO:
      return {
        ...state,
        entornos: state.entornos.filter(entorno => entorno.id !== payload)
      }
    default:
      return {
        ...state
      }
  }
}

export default EntornoReducer
