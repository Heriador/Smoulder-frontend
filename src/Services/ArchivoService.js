/* eslint-disable no-unused-vars */
import API from './api'

const ArchivoService = {
  crear: async (params) => {
    const archivo = await API.post('/archivo/crear', params)

    return archivo.data
  },
  obtener: async ({ actividadId, usuarioId }) => {
    const archivo = await API.get('/archivo/obtener', {
      params: {
        actividadId,
        usuarioId
      }
    })
    return archivo.data
  }
}

export default ArchivoService
