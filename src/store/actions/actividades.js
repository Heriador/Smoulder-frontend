/* eslint-disable no-unused-vars */
import ActividadService from '../../Services/ActividadService'

export const CREAR_ACTIVIDAD = 'CREAR_ACTIVIDAD'
export const CREAR_ANUNCIO = 'CREAR_ANUNCIO'
export const OBTENER_ACTIVIDADES = 'OBTENER_ACTIVIDADES'
export const ACTUALIZAR_ESTADO_ACTIVIDAD = 'ACTUALIZAR_ESTADO_ACTIVIDAD'

export const createAnuncio = (params) => async (dispatch) => {
  const data = await ActividadService.crear(params)

  dispatch({ type: CREAR_ANUNCIO, payload: data })
}

export const createActividad = (params) => async (dispatch) => {
  const data = await ActividadService.crearActividad(params)

  dispatch({ type: CREAR_ACTIVIDAD, payload: data })
}

export const obtenerActividades = (entornoId) => async (dispatch) => {
  const data = await ActividadService.obtener(entornoId)
  console.log(data)
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
