/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import NavbarApp from '../../EntornosHome/components/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { obtenerArchivo } from '../../../store/actions/archivo'
import InfoActividad from '../InfoActividad/InfoActividad'
import EstadoActividad from '../EstadoActividad/estadoActividad'

const Actividades = ({ actividad, entorno }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.AuthReducer.user)

  useEffect(() => {
    dispatch(obtenerArchivo({ actividadId: actividad.id, usuarioId: user.id }))
  }, [dispatch, actividad.id, user.id])

  return (
       <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
               <NavbarApp user={user} out={true} entorno={entorno}/>
               <Row className='align-items-start h-100 d-flex '>
                    <Col
                         xl={1}
                         className='d-flex justify-content-end mt-4'
                    >
                         <FontAwesomeIcon icon='address-book' className='mt-2 ' style={{ width: '50px', height: '50px' }}/>
                    </Col>
                    <Col
                         xl={7}
                         className='h-100'
                    >
                         <InfoActividad actividad={actividad}/>
                    </Col>
                    <Col
                         sm={2}
                         xl={2}
                         className='m-4'
                    >
                         <EstadoActividad actividad={actividad} user={user} />

                    </Col>
               </Row>

       </Container>
  )
}

export default Actividades
