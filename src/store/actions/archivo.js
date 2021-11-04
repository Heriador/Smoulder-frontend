/* eslint-disable no-unused-vars */
import ArchivoService from '../../Services/ArchivoService'

export const CREAR_ARCHIVO = 'CREAR_ARCHIVO'
export const OBTENER_ARCHIVO = 'OBTENER_ARCHIVO'
export const ELIMINAR_ARCHIVO = 'ELIMINAR_ARCHIVO'

export const crearArchivo = (params) => async dispatch => {
  const archivo = await ArchivoService.crear(params)

  dispatch({ type: CREAR_ARCHIVO, payload: archivo })
}

export const obtenerArchivo = (params) => async dispatch => {
  const archivo = await ArchivoService.obtener(params)
  dispatch({ type: OBTENER_ARCHIVO, payload: archivo })
}

export const eliminarArchivo = (params) => async dispatch => {
  const archivo = await ArchivoService.eliminar(params)
  dispatch({ type: ELIMINAR_ARCHIVO })
}
