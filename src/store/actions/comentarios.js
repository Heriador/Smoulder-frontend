/* eslint-disable no-unused-vars */
import ComentarioService from '../../Services/ComentarioService'

export const OBTENER_COMENTARIOS = 'OBTENER_COMENTARIOS'
export const CREAR_COMENTARIO = 'CREAR_COMENTARIO'
export const ELIMINAR_COMENTARIO = 'ELIMINAR_COMENTARIO'

export const obtenerComentarios = ({ actividadId, toUserId }) => async (dispatch) => {
  try {
    const comentarios = await ComentarioService.obtenerComentarios({ actividadId, toUserId })
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
    const comentario = await ComentarioService.crearComentario({ contenido, actividadId, toUserId })
    dispatch({
      type: CREAR_COMENTARIO,
      payload: comentario
    })
  } catch (error) {
    console.log(error)
  }
}

export const eliminarComentario = ({ id }) => async dispatch => {
  try {
    await ComentarioService.eliminarComentario(id)
    dispatch({
      type: ELIMINAR_COMENTARIO,
      payload: id
    })
  } catch (error) {
    console.log(error)
  }
}
