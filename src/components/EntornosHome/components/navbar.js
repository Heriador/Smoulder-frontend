/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Navbar, Nav, Dropdown, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../../../store/actions/auth'
import { crearEntorno, unirseEntorno } from '../../../store/actions/entorno'
import UpdateForm from './UpdateForm/updateForm'
import CreateClass from './CrearEntorno/crearEntorno'
import JoinClass from './JoinEntorno/joinEntorno'
import foto from '../../../assets/photo.png'

const NavbarApp = ({ user, out, calificando, entorno, integrantes }) => {
  const dispatch = useDispatch()
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showJoinClassModal, setShowJoinClassModal] = useState(false)
  const [showCreateClassModal, setShowCreateClassModal] = useState(false)

  const handleCloseUpdate = () => {
    setShowUpdateModal(false)
  }

  const handleCloseCreate = () => {
    setShowCreateClassModal(false)
  }

  const handleCloseJoin = () => {
    setShowJoinClassModal(false)
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const handleCreate = (params) => {
    dispatch(crearEntorno(params))
  }
  const handleJoin = (params) => {
    dispatch(unirseEntorno(params))
  }

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow"
    >
      <Navbar.Brand href="/" className="text-dark fs-2 mx-2">
        SMOULDER
      </Navbar.Brand>

      {
        out &&
        <Nav className='w-50 justify-content-evenly mx-4' justify variant='tabs' defaultActiveKey={calificando ? '2' : integrantes ? '3' : '1'} >
          <Nav.Item>
            <Nav.Link as={Link} to={`/${entorno}`} eventKey='1' >
              Tablon
            </Nav.Link>

          </Nav.Item>

        {
          user.Rol.nombre === 'jefe' &&
          <Nav.Item>
            <Nav.Link as={Link} to={`/${entorno}/actividades`} eventKey='2' >
            Revisar Actividades
            </Nav.Link>

          </Nav.Item>

        }
        <Nav.Item>
          <Nav.Link as={Link} to={`/${entorno}/integrantes`} eventKey='3' >
                integrantes
          </Nav.Link>

        </Nav.Item>

      </Nav>
      }

      <Navbar.Toggle aria-controls="user-nav" />
      <Navbar.Collapse id="user-nav" className="justify-content-end">
        <Nav className="ml-4">
          {
            !out &&
            <Dropdown as={Nav.Item} >
                <Dropdown.Toggle as={Nav.Link} >
                    <FontAwesomeIcon icon='plus' className='fa-icon align-self-center' style={{ width: 30, height: 30 }}/>
                </Dropdown.Toggle>
                <Dropdown.Menu align='right' >
                  {
                    user.Rol.nombre === 'jefe' &&
                    <Dropdown.Item href="#" onClick={() => setShowCreateClassModal(true)}>
                      Crear Entorno
                    </Dropdown.Item>
                  }
                  {
                    user.Rol.nombre === 'empleado' &&
                    <Dropdown.Item href="#" onClick={() => setShowJoinClassModal(true)}>
                      Unirse a un Entorno
                    </Dropdown.Item>
                  }

                </Dropdown.Menu>
            </Dropdown>
          }

          <Nav.Item className="d-inline-flex mt-2">
            <img
              src={ user.avatar || foto }
              width="40"
              height="40"
              className="rounded-circle mr-2 mb-2"
              alt="..."
            />
          </Nav.Item>

          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="text-dark fs-4 mt-1">
              {user.nombre} {user.apellido}
            </Dropdown.Toggle>
            <Dropdown.Menu align='right'>
              <Dropdown.Item onClick={handleLogOut}>
                Cerrar Sesion
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowUpdateModal(true)} >
                Actualizar informacion
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      <Modal show={showUpdateModal || showCreateClassModal || showJoinClassModal} animation={false} onHide={handleCloseUpdate || handleCloseCreate || handleCloseJoin}>
        <Modal.Header>
          <Modal.Title>
            {
              showUpdateModal && 'Actualizar informacion Usuario'
            }
            {
              showCreateClassModal && 'Crear Entorno'
            }
            {
              showJoinClassModal && 'Unirse a un Entorno'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            showUpdateModal && <UpdateForm close={handleCloseUpdate} user={user}/>
          }
          {
            showCreateClassModal && <CreateClass close={handleCloseCreate} create={handleCreate} />
          }
          {
            showJoinClassModal && <JoinClass close={handleCloseJoin} join={handleJoin}/>
          }
        </Modal.Body>

      </Modal>
    </Navbar>
  )
}

export default NavbarApp
