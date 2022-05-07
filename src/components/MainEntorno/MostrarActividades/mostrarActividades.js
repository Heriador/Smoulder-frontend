/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { obtenerActividades, eliminarActivdiad } from '../../../store/actions/actividades'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image } from 'react-bootstrap'
import './mostrarActividades.scss'
import foto from '../../../assets/photo.png'

const MostrarActividadess = ({ entorno }) => {
  const dispatch = useDispatch()
  const actividades = useSelector(state => state.ActividadesReducer.actividades)
  const user = useSelector(state => state.AuthReducer.user)

  const isJefe = (id) => {
    return user.Rol.nombre === 'jefe' ? `/${entorno.id}/actividades` : `/${entorno.id}/${id}`
  }

  const handleDelete = (id) => {
    dispatch(eliminarActivdiad(id))
  }

  useEffect(() => {
    dispatch(obtenerActividades(entorno.id))
  }, [dispatch, entorno.id])
  return (
          <>
               {
                     actividades && actividades.map((actividad, idx) => (
                          <div key={idx} className='m-2'>

                               {
                                   (actividad.Usuarios.filter(u => u.id === user.id).length > 0 || user.Rol.nombre === 'jefe') &&
                                   (<div className='d-flex'>
                                   <Link to={isJefe(actividad.id)} className='custom_link border_custom' style={{ cursor: 'pointer', width: '95%' }}>
                                      <div className="amt actividad">
                                           <div className="amt__Cnt">
                                                <div className="amt__top">

                                                     <Image
                                                          roundedCircle
                                                          style={{
                                                            width: '50px',
                                                            height: '50px'
                                                          }}
                                                          src={ actividad.creador.avatar || foto }
                                                          alt="creador"
                                                     />
                                                     <div>{actividad.creador.nombre} {actividad.creador.apellido}</div>
                                                     <p className="amt__txt"> <strong>Ha publicado una actividad: </strong> {actividad.titulo}</p>
                                                </div>
                                           </div>
                                      </div>
                                 </Link>
                                 {
                                      user.Rol.nombre === 'jefe' &&
                                      <div>
                                      <FontAwesomeIcon icon='trash' onClick={() => handleDelete(actividad.id)} />
                                      </div>
                                 }

                                   </div>)
                               }

                         </div>
                     ))
               }
     </>
  )
}

export default MostrarActividadess
