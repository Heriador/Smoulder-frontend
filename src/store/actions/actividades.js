/* eslint-disable no-unused-vars */
import ActividadService from '../../Services/ActividadService'

export const CREAR_ACTIVIDAD = 'CREAR_ACTIVIDAD'
export const OBTENER_ACTIVIDADES = 'OBTENER_ACTIVIDADES'
export const ACTUALIZAR_ESTADO_ACTIVIDAD = 'ACTUALIZAR_ESTADO_ACTIVIDAD'
export const ELIMINAR_ACTIVIDAD = 'ELIMINAR_ACTIVIDAD'

export const createActividad = (params) => async (dispatch) => {
  const data = await ActividadService.crearActividad(params)
  console.log(data)
  dispatch({ type: CREAR_ACTIVIDAD, payload: data })
}

export const obtenerActividades = (entornoId) => async (dispatch) => {
  const data = await ActividadService.obtener(entornoId)
  data.map((actividad) => {
    actividad.Archivos.map((archivo, idx) => {
      if (archivo.usuarioId !== actividad.creador.id) {
        delete actividad.Archivos[idx]
      }
      return archivo
    })
    return actividad
  })
  dispatch({ type: OBTENER_ACTIVIDADES, payload: { data, entornoId } })
}

export const actualizarEstado = (params) => async (dispatch) => {
  const data = await ActividadService.actualizarEstado(params)
}

export const eliminarActivdiad = (id) => async (dispatch) => {
  const data = await ActividadService.eliminar(id)

  dispatch({ type: ELIMINAR_ACTIVIDAD, payload: data })
}
