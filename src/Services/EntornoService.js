/* eslint-disable no-unused-vars */
import API from './api'

const EntornoService = {

  getEntornos: async () => {
    try {
      const entornos = await API.get('/env ')
      return entornos.data
    } catch (e) {
      console.error(e.message)
    }
  },
  crearEntorno: async (params) => {
    try {
      const entornoCreado = await API.post('/env/crear', params)
      return entornoCreado.data
    } catch (e) {
      console.error(e.message)
    }
  },
  unirseEntorno: async (params) => {
    try {
      const entornoUnido = await API.post('/env/unirse', params)
      return entornoUnido.data
    } catch (e) {
      console.error(e.message)
    }
  },
  eliminarEntorno: async (id) => {
    try {
      const entornoEliminado = await API.delete(`/entorno/eliminar/${id}`)
      return entornoEliminado.data
    } catch (e) {
      console.error(e.message)
    }
  }

}

export default EntornoService
