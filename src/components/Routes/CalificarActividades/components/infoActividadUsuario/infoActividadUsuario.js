/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Image, Dropdown, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { crearComentario, obtenerComentarios, eliminarComentario } from '../../../../../store/actions/comentarios'
import ActividadService from '../../../../../Services/ActividadService'

import './infoActividadUsuario.scss'

const InfoActividadUsuario = ({ user, actividad }) => {
  const dispatch = useDispatch()
  const archivo = useSelector(state => state.ArchivoReducer.archivo)
  const usuario = useSelector(state => state.AuthReducer.user)
  const comentarios = useSelector(state => state.ComentariosReducer.comentarios)

  const ext = Object.keys(archivo).length !== 0 && archivo.nombre.slice((archivo.nombre.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()

  const [estado, setEstado] = useState('')
  const [comentario, setComentario] = useState('')

  const revisado = estado === 'revisado' ? 'text-primary' : user.UsuarioActividade.estadoActividad === 'revisado' ? 'text-primary' : 'text-black'

  const handleClick = async () => {
    setEstado('revisado')
    try {
      await ActividadService.actualizarEstado({ id: actividad.id, usuarioId: user.id })
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(crearComentario({ contenido: comentario, actividadId: actividad.id, toUserId: user.id }))
      setComentario('')
    }
  }

  useEffect(() => {
    dispatch(obtenerComentarios({ actividadId: actividad.id, toUserId: user.id }))
  }, [dispatch, actividad.id, user.id])

  return (
     <div className='info_container w-100 h-100 d-flex justify-content-center '>

     <div className='d-flex w-100 flex-column'>
          <div className='d-flex flex-row w-100'>
               <div className='info_archivoContainer'>
                    {
                         Object.keys(archivo).length !== 0
                           ? <div className='info_archivo'>
                         <div >
                              <p>{archivo.nombre}</p>
                              <a
                                   href={
                                        ext === 'png' || ext === 'jpg'
                                          ? archivo.url
                                          : `http://docs.google.com/gview?url=${archivo.url}`
                                        }
                                   target='_blank'
                                   rel="noopener noreferrer"
                              >
                                   <Image

                                        src={
                                             ext === 'png' || ext === 'jpg'
                                               ? archivo.url
                                               : `${process.env.REACT_APP_BACKEND}/placeholders/${ext}.png`

                                        }

                                        alt={archivo.nombre}
                                        style={{
                                          width: '150px',
                                          height: '150px'
                                        }}
                                   />
                              </a>

                         </div>
                         <div>
                              <a href={archivo.url}>
                                   <FontAwesomeIcon icon='download' />

                              </a>
                         </div>
                         </div>
                           : <p>Sin archivo subido</p>
                    }
               </div>
               <div className='info_estado'>
                    <div className={`estado_actual  ${revisado}`}>
                    {
                         user !== '' && estado === 'revisado' ? 'revisado' : user.UsuarioActividade.estadoActividad
                    }
                    </div>
                    <div className='actualizar_estado' >
                         <Dropdown>
                              <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                                   Actualizar Estado Actividad
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                   <Dropdown.Item onClick={handleClick} >Revisado</Dropdown.Item>
                              </Dropdown.Menu>
                         </Dropdown>
                    </div>
               </div>
          </div>

          <div className='comentario_wrapper'>
                    {
                         comentarios.length > 0 &&
                         comentarios.map((comentario, index) => {
                           return (
                                   <div key={index} className='d-flex '>
                                        <div className=' d-flex m-2 ' >
                                             < Image
                                                  roundedCircle
                                                  src={
                                                       comentario.Usuario.avatar ||
                                                       'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg'

                                                  }
                                                  alt='avatar'
                                                  style={{
                                                    width: '50px',
                                                    height: '50px'
                                                  }}
                                             />
                                             <div className='mx-2'>
                                                  <h5>{comentario.Usuario.nombre} {comentario.Usuario.apellido}</h5>
                                                  <p>{comentario.contenido}</p>
                                             </div>

                                        </div>
                                        <div>

                                             {
                                                  comentario.Usuario.id === usuario.id &&
                                                  <FontAwesomeIcon icon='trash' onClick={() => dispatch(eliminarComentario({ id: comentario.id })) } />
                                             }
                                        </div>
                                   </div>

                           )
                         })
                    }
          </div>

          <div>
               <Form.Group>
                    <Form.Control
                         type='text'
                         placeholder='Comentario'
                         value={comentario}
                         onChange={e => setComentario(e.target.value)}
                         onKeyDown={handleKeyDown}
                    />
               </Form.Group>
          </div>

     </div>

</div>
  )
}

export default InfoActividadUsuario
