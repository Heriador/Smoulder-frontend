/* eslint-disable no-unused-vars */
import ComentarioService from '../../Services/ComentarioService'

export const OBTENER_COMENTARIOS = 'OBTENER_COMENTARIOS'
export const CREAR_COMENTARIO = 'CREAR_COMENTARIO'

export const obtenerComentarios = (id) => async (dispatch) => {
  try {
    const comentarios = await ComentarioService.obtenerComentarios(id)
    dispatch({
      type: OBTENER_COMENTARIOS,
      payload: comentarios
    })
  } catch (error) {
    console.log(error)
  }
}

export const crearComentario = ({ contenido, actividadId, toUserId }) => async dispatch => {
  try {
    const comentario = await ComentarioService.crearComentario({ contenido, actividadId })
    dispatch({
      type: CREAR_COMENTARIO,
      payload: comentario
    })
  } catch (error) {
    console.log(error)
  }
}
