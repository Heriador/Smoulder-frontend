/* eslint-disable no-unused-vars */
import { CREAR_COMENTARIO, OBTENER_COMENTARIOS } from '../actions/comentarios'

const initialState = {
  comentarios: []
}

const ComentariosReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case OBTENER_COMENTARIOS:
      return {
        ...state,
        comentarios: payload
      }

    case CREAR_COMENTARIO:

      return {
        ...state,
        comentarios: [...state.comentarios, payload]
      }

    default:
      return state
  }
}

export default ComentariosReducer
