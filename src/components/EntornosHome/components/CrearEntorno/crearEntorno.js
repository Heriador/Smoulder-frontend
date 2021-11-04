/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateClass = ({ close, create }) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    create({ titulo, descripcion })

    close()
  }

  return (
        <>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Label> Titulo </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label> descripcion </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='descripcion'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Form.Group>
                <div className='d-flex justify-content-between align-items-center mx-4 mt-4'>
                    <Button type='submit'>
                        Crear Entorno
                    </Button>
                    <Button variant="danger" onClick={() => {
                      close()
                    }} className='mx-4'>
                    Cancel
                    </Button>
                </div>

            </Form >
        </>
  )
}

export default CreateClass
