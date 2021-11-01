import { combineReducers } from 'redux'
import AuthReducer from './auth'
import EntornoReducer from './entorno'
import ActividadesReducer from './actividades'
import ArchivoReducer from './archivo'
import ComentariosReducer from './comentarios'

export default combineReducers({
  AuthReducer,
  EntornoReducer,
  ActividadesReducer,
  ArchivoReducer,
  ComentariosReducer
})
