/* eslint-disable no-unused-vars */
import API from './api'

const ComentarioService = {
  obtenerComentarios: async (actividadId) => {
    const comentarios = await API.get('/comentarios', {
      params: {
        actividadId
      }
    })

    return comentarios.data
  },
  crearComentario: async (params) => {
    const comentario = await API.post('/comentario/crear', params)
    console.log(comentario)
  }

}

export default ComentarioService
