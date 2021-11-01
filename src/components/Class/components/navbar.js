/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Navbar, Nav, Dropdown, Modal, Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../../../store/actions/auth'
import { crearEntorno, unirseEntorno } from '../../../store/actions/entorno'
import UpdateForm from './UpdateForm/updateForm'
import CreateClass from './CrearEntorno/crearEntorno'
import JoinClass from './JoinEntorno/joinEntorno'

const NavbarApp = ({ user, out, calificando, entorno, integrantes }) => {
  const dispatch = useDispatch()
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showJoinClassModal, setShowJoinClassModal] = useState(false)
  const [showCreateClassModal, setShowCreateClassModal] = useState(false)
  const [show, setShow] = useState(false)

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
    dispatch(crearEntorno({ ...params, creadorId: user.id }))
    console.log(params)
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

          {/* <Link to={`/${entorno}`}> Tablon </Link> */}

          </Nav.Item>
        {/* <Nav.Link >

          <Link to={`/${entorno}`}> Tablon </Link>
        </Nav.Link> */}
        {
          user.Rol.nombre === 'jefe' &&
          <Nav.Item>
            <Nav.Link as={Link} to={`/${entorno}/actividades`} eventKey='2' >
            Revisar Actividades
            </Nav.Link>
            {/* <Link to={`/${entorno}/actividades`}> Revisar Actividades </Link> */}

          </Nav.Item>
          // <Nav.Link >
          //   <Link to={`/${entorno}/actividades`}> Revisar Actividades </Link>
          // </Nav.Link>
        }
        <Nav.Item>
          <Nav.Link as={Link} to={`/${entorno}/integrantes`} eventKey='3' >
                integrantes
          </Nav.Link>
        {/* <Link to={`/${calificando}/integrantes`}> integrantes </Link> */}

        </Nav.Item>

        {/* <Nav.Link>
          <Link to={`/${calificando}/integrantes`}> integrantes </Link>
        </Nav.Link> */}

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
                  <Dropdown.Item href="#" onClick={() => setShowJoinClassModal(true)}>
                    Unirse a un Entorno
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          }

          <Nav.Item className="d-inline-flex mt-2">
            <img
              src={ user.avatar ||
                'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg'
              }
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
              <Dropdown.Item href="#" onClick={handleLogOut}>
                LogOut
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setShowUpdateModal(true)} >
                Update User
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
            showCreateClassModal && <CreateClass close={handleCloseCreate} create={handleCreate} user={user}/>
          }
          {
            showJoinClassModal && <JoinClass close={handleCloseJoin} join={handleJoin}/>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseUpdate}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}

export default NavbarApp
