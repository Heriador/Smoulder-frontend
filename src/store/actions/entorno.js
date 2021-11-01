/* eslint-disable no-unused-vars */
import EntornoService from '../../Services/EntornoService'
// import { useSelector } from 'react-redux'

export const FECTCH_ENTORNO = 'FECTCH_ENTORNO'
export const CREAR_ENTORNO = 'CREAR_ENTORNO'
export const UNIRSE_ENTORNO = 'UNIRSE_ENTORNO'
export const ACTUALIZAR_ENTORNO = 'ACTUALIZAR_ENTORNO'
export const ELIMINAR_ENTORNO = 'ELIMINAR_ENTORNO'

export const fetchEntorno = () => async (dispatch) => {
  try {
    let aux = 0
    const entornos = await EntornoService.getEntornos()

    entornos.map((env) => {
      env.Usuarios.map((usuario, idx) => {
        if (usuario.id === env.creadorId) {
          env.creador = usuario
          delete env.creadorId
          aux = idx
        }
        delete usuario.contraseña
        return usuario
      })
      env.Usuarios.splice(aux, 1)
      return env
    })
    setHeaderStorage(entornos)
    dispatch({
      type: FECTCH_ENTORNO,
      payload: entornos
    })
  } catch (e) {
    console.log(e.message)
  }
}

export const crearEntorno = (params) => async (dispatch) => {
  try {
    const { titulo, descripcion, user } = params
    const entorno = await EntornoService.crearEntorno({ titulo, descripcion, creadorId: user.id })
    console.log(entorno)
    delete entorno.creadorId

    dispatch({
      type: CREAR_ENTORNO,
      payload: entorno
    })
  } catch (e) {
    console.log(e)
  }
}

export const unirseEntorno = (params) => async (dispatch) => {
  try {
    const entorno = await EntornoService.unirseEntorno({ entornoId: params })
    // entorno.Usuarios.push(user)
    entorno.creador = entorno.Usuarios.filter((usuario) => usuario.id === entorno.creadorId)[0]
    delete entorno.creadorId

    dispatch({
      type: UNIRSE_ENTORNO,
      payload: entorno
    })
  } catch (e) {
    console.log(e)
  }
}

export const actualizarEntorno = (params) => async (dispatch) => {
  try {
    const entorno = await EntornoService.actualizarEntorno(params)
    dispatch({
      type: ACTUALIZAR_ENTORNO,
      payload: entorno
    })
  } catch (e) {
    console.log(e)
  }
}

export const eliminarEntorno = (id) => async (dispatch) => {
  try {
    await EntornoService.eliminarEntorno(id)
    dispatch({
      type: ELIMINAR_ENTORNO,
      payload: id
    })
  } catch (e) {
    console.log(e)
  }
}

const setHeaderStorage = (entornos) => {
  localStorage.setItem('entornos', JSON.stringify(entornos))
}
