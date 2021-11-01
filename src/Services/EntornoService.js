/* eslint-disable no-unused-vars */
import API from './api'

const EntornoService = {

  getEntornos: async () => {
    const entornos = await API.get('/env ')
    return entornos.data
  },
  crearEntorno: async (params) => {
    const entornoCreado = await API.post('/env/crear', params)
    return entornoCreado.data
  },
  unirseEntorno: async (params) => {
    const entornoUnido = await API.post('/env/unirse', params)
    return entornoUnido.data
  },
  eliminarEntorno: async (id) => {
    const entornoEliminado = await API.delete(`/entorno/eliminar/${id}`)
    return entornoEliminado.data
  }

}

export default EntornoService
