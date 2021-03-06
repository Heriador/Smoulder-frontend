/* eslint-disable react/prop-types */
import React from 'react'
import { Image, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NavbarApp from '../../EntornosHome/components/navbar'
import foto from '../../../assets/photo.png'

const IntegrantesEntorno = ({ entorno }) => {
  const user = useSelector(state => state.AuthReducer.user)
  return (
          <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
               <NavbarApp user={user} entorno={entorno.id} out={true} integrantes={true}/>

          <Row className='mt-2'>
          <ol>
               <div className='d-flex flex-column align-items-center'>
                    <h3>Jefe</h3>
                    {
                         <li className='d-flex align-items-end'>
                              <Image roundedCircle
                                   src={entorno.creador.avatar || foto }
                                   alt={entorno.creador.nombre}
                                   style={{ width: '50px', height: '50px' }}
                              />
                              <p className='mx-2'>{entorno.creador.fullName}</p>
                         </li>
                    }
               </div>
               <hr size='2px' />
               <div className='d-flex flex-column align-items-center'>
                    <h3>Empleados</h3>
               {
                    entorno.Usuarios.map((usuario, index) => {
                      return (
                                  <li key={index} className='d-flex align-items-end m-2'>
                                       <Image roundedCircle
                                             src={usuario.avatar || foto}
                                             alt={usuario.nombre}
                                             style={{ width: '50px', height: '50px' }}
                                        />
                                       <p className='mx-2'>{usuario.fullName}</p>
                                  </li>
                      )
                    })
               }
               </div>

          </ol>
          </Row>
          </Container>
  )
}

export default IntegrantesEntorno
