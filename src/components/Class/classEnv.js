/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Container, Row, Modal } from 'react-bootstrap'
import NavbarApp from './components/navbar'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEntorno, eliminarEntorno } from '../../store/actions/entorno'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faEllipsisV, faPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell, faAddressBook, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons'
import EntornoPreview from './components/EntornoPreview/entornoPreview'

library.add(faSmile, faImage, faSpinner, faEllipsisV, faPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell, faAddressBook, faDownload, faEdit)

const ClassEnv = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.AuthReducer.user)
  const entornos = useSelector(state => state.EntornoReducer.entornos)

  const handleDelete = (id) => {
    dispatch(eliminarEntorno(id))
  }

  useEffect(() => {
    dispatch(fetchEntorno())
  }, [dispatch, entornos])

  return (
    <Container fluid className='p-0 d-flex flex-column position-absolute h-100'>
      <NavbarApp user={user} />
      <Row className='p-4'>
        <ol className='joined'>
        {
          entornos.map(entorno => (
            <EntornoPreview key={entorno.id} entorno={entorno} eliminar={handleDelete} />
          ))
        }
        </ol>
      </Row>

    </Container>
  )
}

export default ClassEnv
