/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { crearArchivo, eliminarArchivo } from '../../../store/actions/archivo'
import { crearComentario, obtenerComentarios, eliminarComentario } from '../../../store/actions/comentarios'
import ActividadService from '../../../Services/ActividadService'

import './estadoActividad.scss'

const EstadoActividad = ({ actividad, user }) => {
  const dispatch = useDispatch()
  const fileUpload = useRef()

  const [file, setFile] = useState('')
  const [comentario, setComentario] = useState('')

  const archivo = useSelector(state => state.ArchivoReducer.archivo)
  const comentarios = useSelector(state => state.ComentariosReducer.comentarios)

  const handleSubmit = async (e) => {
    const data = new FormData()

    data.append('file', file)
    data.append('actividadId', actividad.id)

    dispatch(crearArchivo(data))

    if (Object.keys(archivo).length > 0) {
      await ActividadService.actualizarEstado({ estado: 'entregada', actividadId: actividad.id })
    }
  }

  const handleDelete = async () => {
    setFile('')
    dispatch(eliminarArchivo({ archivoId: archivo.id, actividadId: actividad.id }))
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      dispatch(crearComentario({ contenido: comentario, actividadId: actividad.id, toUserId: user.id }))
      setComentario('')
    }
  }

  useEffect(() => {
    dispatch(obtenerComentarios({ actividadId: actividad.id, toUserId: user.id }))
  }, [dispatch, actividad.id, user.id])

  const color = actividad.Usuarios.filter(u => u.id === user.id)[0].UsuarioActividade.estadoActividad === 'revisado' ? 'primary' : Object.keys(archivo).length > 0 ? 'success' : 'black'

  return (

     <>
          <div className='wrapper'>
          <div className='upload_wrapper'>
               <div className='upload_info'>
                    <h3>Tu Trabajo</h3>
                    <p className={`text-${color}`}>

                         {
                              actividad.Usuarios.filter(u => u.id === user.id)[0].UsuarioActividade.estadoActividad === 'revisado'
                                ? 'Revisada'
                                : Object.keys(archivo).length > 0
                                  ? 'Entregada'
                                  : 'Asignada'
                         }

                    </p>
               </div>
               {
                    (file.name || Object.keys(archivo).length !== 0) &&
                    <div id='info_file'>
                         <p>{file.name || archivo.nombre }</p>
                         {
                              actividad.Usuarios.filter(u => u.id === user.id)[0].UsuarioActividade.estadoActividad !== 'revisado' &&
                              <FontAwesomeIcon
                                   onClick={handleDelete}
                                   style={{ width: '20px', height: '20px' }}
                                   icon='times'
                                   className='fa-icon'
                              />
                         }

                    </div>
               }
               {
                              actividad.Usuarios.filter(u => u.id === user.id)[0].UsuarioActividade.estadoActividad !== 'revisado' &&
                              (<>
                                   <Button
                                        variant='outline-dark'
                                        onClick={() => fileUpload.current.click()}
                                        className='m-2'
                                   >
                                        Añadir Archivo
                                   </Button>
                                   <Button variant='primary' onClick={handleSubmit}>
                                        {
                                             file ? 'Entregar Archivo' : 'Marcar como entregado'
                                        }

                                   </Button>
                              </>
                              )
               }

          </div>
          <input
               hidden
               type="file" ref={fileUpload}
               onChange={(e) => {
                 setFile(e.target.files[0])
               }}
          />

          </div>

          <div className='comentario_wrapper'>
               {
                    comentarios.length > 0 &&
                    comentarios.map((comentario, index) => {
                      return (
                              <div key={index} className='d-flex'>
                                    <div className=' d-flex m-2' >
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
                                           <h6>{comentario.Usuario.nombre} {comentario.Usuario.apellido}</h6>
                                           <p>{comentario.contenido}</p>
                                      </div>

                                   </div>

                                   <div>
                                        {
                                             comentario.Usuario.id === user.id &&
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
     </>

  )
}

export default EstadoActividad
