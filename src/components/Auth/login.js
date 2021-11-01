/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, googleAuth } from '../../store/actions/auth'
import GoogleImg from '../../assets/googleImage.png'

import './login.scss'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.AuthReducer.token)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Login, setLogin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      dispatch(login({ correo: email, contraseña: password }, history))
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleLogin = () => {
    window.open('http://localhost:8080/auth/google', '_self')
  }

  useEffect(() => {
    if (Login || !token) {
      dispatch(googleAuth(history))
    }
  }, [dispatch, history, Login, token])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={4}>
          <Card className="mt-5">
            <Card.Header>LOGIN</Card.Header>
            <Card.Body className='loginContainer'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginEmail">
                  <Form.Label className="mr-4">email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                  <Form.Label className="mr-4">password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <div className='googleContainer' onClick={() => {
                handleLogin()

                setLogin(true)
              }}>
                <img src={GoogleImg} alt='google login' />
                <p>Login with google</p>
              </div>
            </Card.Body>
            <Card.Footer>
              <p>
                 Don't have an account?
                <Link to="/register">Sign up</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
