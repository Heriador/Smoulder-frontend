import API from './api'

const ActividadService = {
  crear: async (params) => {
    const actividad = await API.post('/anuncio/crear', params)

    console.log(actividad)
    return actividad.data
  },
  crearActividad: async (params) => {
    const actividad = await API.post('/actividad/crear', params)

    console.log(actividad)
    return actividad.data
  },
  obtener: async (entornoId) => {
    const actividad = await API.get('/actividad/listar', {
      params: {
        entornoId
      }
    })

    localStorage.setItem('actividades', JSON.stringify(actividad.data))
    return actividad.data
  },
  actualizar: async (params) => {
    const actividad = await API.put('/actividad/actualizar', params)

    console.log(actividad)
    // return actividad.data
  },
  actualizarEstado: async ({ id, usuarioId }) => {
    try {
      const actividad = await API.put(`/actividad/actualizarEstado/${id}`, { usuarioId })

      console.log(actividad)
      return actividad.data[0]
    } catch (e) {
      console.error(e.message)
    }
  }

}

export default ActividadService
