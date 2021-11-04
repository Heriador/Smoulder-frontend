/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { updateUser } from '../../../../store/actions/auth'
import { useDispatch } from 'react-redux'

const UpdateForm = ({ user, close }) => {
  const dispatch = useDispatch()

  const [nombre, setNombre] = useState(user.nombre || '')
  const [apellido, setApellido] = useState(user.apellido || '')
  const [correo, setCorreo] = useState(user.correo || '')
  const [contraseña, setContraseña] = useState('')
  const [avatar, setAvatar] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = { nombre, apellido, correo }

    if (contraseña.length > 0) form.contraseña = contraseña
    const formData = new FormData()

    for (const key in form) {
      formData.append(key, form[key])
    }

    formData.append('file', avatar)
    formData.append('bucketName', 'images-smoulder')

    await dispatch(updateUser(formData))

    close()
  }

  return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label> nombre </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='nombre'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> apellido </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='apellido'
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> correo </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='correo'
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> contraseña </Form.Label>
                <Form.Control
                    type='password'
                    placeholder='contraseña'
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label> Avatar </Form.Label>
                <Form.Control
                    type='File'
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            </Form.Group>
            <div className='d-flex justify-content-between mt-2'>
            <Button type='submit'>
                Guardar cambios
            </Button>
            <Button variant='danger' onClick={() => close()}>
                cancel
            </Button>
            </div>

        </Form>
  )
}

export default UpdateForm
