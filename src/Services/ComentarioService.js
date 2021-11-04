/* eslint-disable no-unused-vars */
import API from './api'

const ComentarioService = {
  obtenerComentarios: async ({ actividadId, toUserId }) => {
    try {
      const comentarios = await API.get('/comentarios', {
        params: {
          actividadId,
          toUserId
        }
      })

      return comentarios.data
    } catch (e) {
      console.error(e.message)
    }
  },
  crearComentario: async (params) => {
    try {
      const comentario = await API.post('/comentario/crear', params)
      return comentario.data
    } catch (e) {
      console.error(e.message)
    }
  },
  eliminarComentario: async (id) => {
    try {
      const comentario = await API.delete(`/comentario/eliminar/${id}`)
      return id
    } catch (e) {
      console.error(e.message)
    }
  }

}

export default ComentarioService
