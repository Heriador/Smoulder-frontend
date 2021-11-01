/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Image, Dropdown, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { crearComentario, obtenerComentarios } from '../../../../../store/actions/comentarios'
import ActividadService from '../../../../../Services/ActividadService'

import './infoActividadUsuario.scss'

const InfoActividadUsuario = ({ user, actividad }) => {
  const dispatch = useDispatch()
  const archivo = useSelector(state => state.ArchivoReducer.archivo)
  const comentarios = useSelector(state => state.ComentariosReducer.comentarios)

  const ext = Object.keys(archivo).length !== 0 && archivo.Nombre.split('.')[1].toLowerCase()

  const [estado, setEstado] = useState('')
  const [comentario, setComentario] = useState('')

  const revisado = estado === 'revisado' ? 'text-primary' : user.UsuarioActividade.estadoActividad === 'revisado' ? 'text-primary' : 'text-black'

  const handleClick = async () => {
    setEstado('revisado')
    await ActividadService.actualizarEstado({ id: actividad.id, usuarioId: user.id })
    //     dispatch()
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      dispatch(crearComentario({ contenido: comentario, actividadId: actividad.id }))
      setComentario('')
    }
  }

  useEffect(() => {
    if (comentarios.length === 0 || comentario !== '') {
      dispatch(obtenerComentarios(actividad.id))
    }
  }, [dispatch, actividad.id, comentario, comentarios])

  return (
     <div className='info_container w-100 h-100 d-flex justify-content-center '>

     <div className='d-flex w-100 flex-column'>
          <div className='d-flex flex-row w-100'>
               <div className='info_archivoContainer'>
                    {
                         Object.keys(archivo).length !== 0 &&
                         <div className='info_archivo'>
                         <div >

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
                                               : `http://localhost:8080/public/placeholders/${archivo.Nombre.split('.')[1].toLowerCase()}.png`

                                        }

                                        alt='pdf'
                                        style={{
                                          width: '150px',
                                          height: '150px'
                                        }}
                                   />
                              </a>

                         </div>
                         <div>
                              <FontAwesomeIcon icon='download' />
                         </div>
                         </div>
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
                                   <div className=' d-flex m-2 ' key={index}>
                                        < Image
                                             roundedCircle
                                             src={comentario.Usuario.avatar}
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
