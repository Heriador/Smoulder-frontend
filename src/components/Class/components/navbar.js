import React, { useState } from "react";
import { Navbar, Nav, Dropdown, Modal, Button, Offcanvas } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { logOut } from "../../../store/actions/chat"
// import UpdateForm from '../UpdateForm/UpdateForm'

const NavbarApp = ({ user }) => {
  const dispatch = useDispatch()
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShowUpdateModal(false);
  };

  const handleLogOut = () => {
    dispatch(logOut())
  };


  const handleCloseoff = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow"
    >
      <Button variant="secondary" className='mx-2' onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleCloseoff} className='m-2'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>

      <Navbar.Brand href="/" className="text-dark fs-2 mx-2">
        SMOULDER
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="user-nav" />
      <Navbar.Collapse id="user-nav" className="justify-content-end">
        <Nav className="ml-4">
          <Nav.Item className="d-inline-flex mt-2">
            <img
              src={user.avatar}
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
              <Dropdown.Item href="#" onClick={() => setShowUpdateModal(true)}>
                Update User
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      <Modal show={showUpdateModal} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <UpdateForm close={handleClose} user={user}/> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default NavbarApp;
