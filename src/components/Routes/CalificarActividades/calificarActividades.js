/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import NavbarApp from '../../EntornosHome/components/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerArchivo } from '../../../store/actions/archivo'
import InfoActividadUsuario from './components/infoActividadUsuario/infoActividadUsuario'
import './calificarActividades.scss'

const CalificarActividades = ({ entorno }) => {
  const dispatch = useDispatch()
  const actividades = useSelector(state => state.ActividadesReducer.actividades)
  const user = useSelector(state => state.AuthReducer.user)

  const [currentUser, setCurrentUser] = useState('')
  const [currentActividad, setCurrentActividad] = useState('')

  const handleClick = async (usuario) => {
    setCurrentUser(usuario)
    dispatch(obtenerArchivo({ actividadId: usuario.UsuarioActividade.actividadId, usuarioId: usuario.id }))
  }

  const isSelected = (usuario, actividad) => (currentUser.id === usuario.id && currentActividad.id === actividad.id) ? 'selected' : ''
  console.log(actividades.length)
  return (

     <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
          <NavbarApp user={user} out={true} entorno={entorno.id} calificando={true} />
          <Row className='h-100 mt-2'>
               <Col xl={2} >
                    <Accordion>
                    { actividades.length > 0
                      ? actividades.map(actividad => {
                        console.log(actividad)
                        return (
                          actividad.Usuarios.length > 0 &&
                              <Accordion.Item key={actividad.id} eventKey={actividad.id} >
                                   <Accordion.Header>
                                        {actividad.titulo}
                                   </Accordion.Header>

                                   {
                                        actividad.Usuarios.map(usuario => (
                                             <Accordion.Body key={usuario.id}
                                              className={`body_user ${isSelected(usuario, actividad)}`}
                                             onClick={() => {
                                               handleClick(usuario)
                                               setCurrentActividad(actividad)
                                             }}>
                                                       {usuario.fullName}
                                             </Accordion.Body>
                                        ))

                                   }
                              </Accordion.Item>

                        )
                      })

                      : <div>No hay actividades</div>
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
