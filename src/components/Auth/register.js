/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/auth'

const Register = ({ history }) => {
  const dispatch = useDispatch()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [rol, setRol] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      dispatch(register({ nombre, apellido, correo, contraseña, rol }, history))
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
        <Container >
            <Row className='justify-content-center'>
                <Col sm={4} >
                    <Card className='mt-5'>
                        <Card.Header>REGISTER</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='RegisterFirstName'>
                                    <Form.Label className='mr-4'>Nombre</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='nombre'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='Registerapellido'>
                                    <Form.Label className='mr-4'>Apellido</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Apellido'
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='Registercorreo'>
                                    <Form.Label className='mr-4'>Correo</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Correo'
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='Registercontraseña'>
                                    <Form.Label className='mr-4'>Contraseña</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Contraseña'
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                <Form.Label className='mr-4'>Rol</Form.Label>
                                    <Form.Select onChange={(e) => setRol(e.target.value)} >
                                        <option value={1}>Jefe</option>
                                        <option value={2}>Empleado</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button
                                    className='mt-3'
                                    variant="primary"
                                    type="submit"
                                >
                                    Registrarse
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p>Ya tienes una cuenta? <Link to='/login'>Inicia Sesion</Link> </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}

export default Register
