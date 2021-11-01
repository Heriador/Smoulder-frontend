/* eslint-disable no-sequences */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { obtenerActividades } from '../../../store/actions/actividades'
import { Image } from 'react-bootstrap'
import Anuncios from './components/Anuncios/anuncios'
import './anuncio.scss'

const MostrarAnuncios = ({ entorno }) => {
  const dispatch = useDispatch()
  const actividades = useSelector(state => state.ActividadesReducer.actividades)
  const user = useSelector(state => state.AuthReducer.user)

  const isJefe = (id) => {
    return user.Rol.nombre === 'jefe' ? `/${entorno.id}/actividades` : `/${entorno.id}/${id}`
  }

  useEffect(() => {
    dispatch(obtenerActividades(entorno.id))
  }, [dispatch, entorno.id])
  return (
          <>
               {
                     actividades && actividades.map((actividad, idx) => (
                          <div key={idx}>
                              {
                                   actividad.type === 'Actividad'
                                     ? (
                                        <Link to={isJefe(actividad.id)} className='custom_link border_custom' style={{ cursor: 'pointer' }}>
                                             <div className="amt actividad">
                                             <div className="amt__Cnt">
                                                  <div className="amt__top">

                                                       <Image
                                                            roundedCircle
                                                            style={{
                                                              width: '50px',
                                                              height: '50px'
                                                            }}
                                                            src={
                                                            actividad.creador.avatar ||
                                                            'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg'
                                                            }
                                                            alt="creador"
                                                       />
                                                       <div>{actividad.creador.nombre} {actividad.creador.apellido}</div>
                                                       <p className="amt__txt"> <strong>Ha publicado una activida:</strong> {actividad.titulo}</p>
                                                  </div>
                                             </div>
                                             </div>
                                        </Link>

                                       )

                                     : actividad.type === 'Anuncio' && (
                                        <>

                                        <Anuncios actividad={actividad} />

                                        </>
                                     )
                              }
                         </div>
                     ))
               }
     </>
  )
}

export default MostrarAnuncios
