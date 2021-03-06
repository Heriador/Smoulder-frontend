/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'

import './login.scss'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      dispatch(login({ correo, contraseña }, history))
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <Card className="mt-5">
            <Card.Header>LOGIN</Card.Header>
            <Card.Body className='loginContainer'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginEmail">
                  <Form.Label className="mr-4">correo</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                  <Form.Label className="mr-4">contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                  Iniciar Sesion
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <p>
                 No tienes una cuenta?
                <Link to="/register">Registrate</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
