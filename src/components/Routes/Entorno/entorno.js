/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import NavbarApp from '../../EntornosHome/components/navbar'
import MainEntorno from '../../MainEntorno/mainEntorno'

const Entorno = ({ entorno }) => {
  const user = useSelector(state => state.AuthReducer.user)
  return (
          <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
               <NavbarApp user={user} out={true} entorno={entorno.id} />
               <Row>
                    <MainEntorno user={user} entorno={entorno} />
               </Row>
          </Container>
  )
}

export default Entorno
