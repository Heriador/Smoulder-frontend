/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Accordion, Image } from 'react-bootstrap'
import NavbarApp from '../../Class/components/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerArchivo } from '../../../store/actions/archivo'
import InfoActividadUsuario from './components/infoActividadUsuario/infoActividadUsuario'
import './calificarActividades.scss'

const CalificarActividades = ({ entorno }) => {
  const dispatch = useDispatch()
  const actividades = useSelector(state => state.ActividadesReducer.actividades)
  const user = useSelector(state => state.AuthReducer.user)
  const archivo = useSelector(state => state.ArchivoReducer.archivo)

  const [currentUser, setCurrentUser] = useState('')
  const [currentActividad, setCurrentActividad] = useState('')

  const handleClick = async (user) => {
    setCurrentUser(user)
    dispatch(obtenerArchivo({ actividadId: user.UsuarioActividade.actividadId, usuarioId: user.id }))
  }

  console.log(actividades)
  return (

     <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
          <NavbarApp user={user} out={true} entorno={entorno.id} calificando={true} />
          <Row className='h-100 mt-2'>
               <Col xl={2} >
                    <Accordion>
                    {
                         actividades.map(actividad => {
                           return (
                             actividad.Usuarios.length > 0 &&
                              <Accordion.Item key={actividad.id} eventKey={actividad.id} >
                                   <Accordion.Header>
                                        {actividad.titulo}
                                   </Accordion.Header>

                                   {
                                        actividad.Usuarios.map(usuario => (
                                             <Accordion.Body key={usuario.id}
                                              className='body_user'
                                             onClick={(e) => {
                                               handleClick(usuario)
                                               setCurrentUser(usuario)
                                               setCurrentActividad(actividad)
                                             }}>
                                                  <div >
                                                       {usuario.fullName}
                                                  </div>
                                             </Accordion.Body>
                                        ))

                                   }
                              </Accordion.Item>

                           )
                         })
                    }
                    </Accordion>
               </Col>
               <Col xl={8}>
                    {
                         currentUser !== '' &&
                         <InfoActividadUsuario user={currentUser} actividad={currentActividad} />

                    }
               </Col>
          </Row>
     </Container>

  )
}

export default CalificarActividades
