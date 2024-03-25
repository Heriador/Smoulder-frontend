/* eslint-disable no-unused-vars */
import API from './api'

const ArchivoService = {
  crear: async (params) => {
    try {
      const archivo = await API.post('/archivo/crear', params)

      return archivo.data
    } catch (e) {
      console.error(e.message)
    }
  },
  obtener: async ({ actividadId, usuarioId }) => {
    try {
      const archivo = await API.get('/archivo/obtener', {
        params: {
          actividadId,
          usuarioId
        }
      })
      return archivo.data
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return {}
      } else {
        console.error(e.message)
      }
    }
  },
  eliminar: async ({ actividadId, archivoId }) => {
    try {
      const archivo = await API.delete(`/archivo/eliminar/${archivoId}`, {
        params: {
          actividadId
        }
      })

      return archivo.data
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default ArchivoService
