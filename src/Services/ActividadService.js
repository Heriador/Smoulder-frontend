import API from './api'

const ActividadService = {
  crearActividad: async (params) => {
    try {
      const actividad = await API.post('/actividad/crear', params)
      console.log(actividad.data)
      return actividad.data
    } catch (e) {
      console.error(e.message)
    }
  },
  obtener: async (entornoId) => {
    try {
      const actividad = await API.get('/actividad/listar', {
        params: {
          entornoId
        }
      })

      localStorage.setItem('actividades', JSON.stringify(actividad.data))
      return actividad.data
    } catch (e) {
      console.error(e.message)
    }
  },
  actualizarEstado: async ({ id, usuarioId }) => {
    try {
      const actividad = await API.put(`/actividad/actualizarEstado/${id}`, { usuarioId })

      return actividad.data[0]
    } catch (e) {
      console.error(e.message)
    }
  },
  eliminar: async (id) => {
    try {
      await API.delete(`/actividad/eliminar/${id}`)

      return id
    } catch (e) {
      console.error(e.message)
    }
  }

}

export default ActividadService
