/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/auth'

const Register = ({ history }) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      dispatch(register({ nombre: firstName, apellido: lastName, correo: email, contraseña: password }, history))
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
                                    <Form.Label className='mr-4'>First Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='firstName'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='RegisterLastName'>
                                    <Form.Label className='mr-4'>Last Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='lastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='RegisterEmail'>
                                    <Form.Label className='mr-4'>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='RegisterPassword'>
                                    <Form.Label className='mr-4'>password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button
                                    className='mt-3'
                                    variant="primary"
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <p>Already have an account? <Link to='/login'>Log in</Link> </p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
  )
}

export default Register
