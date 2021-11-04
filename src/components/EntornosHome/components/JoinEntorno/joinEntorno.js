/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const JoinClass = ({ close, join }) => {
  const [codigo, setCodigo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    join(codigo)
    close()
  }

  return (
        <>
        <Form onSubmit={handleSubmit} >
            <Form.Group>
                <Form.Label> Codigo de Entorno </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='codigo'
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
            </Form.Group>
            <div className='d-flex justify-content-between align-items-center mx-4 mt-4'>
                <Button type='submit'>
                    Unirse
                </Button>
                <Button variant="danger" onClick={close} className='mx-4'>
                Cancel
                </Button>
            </div>

        </Form >
    </>
  )
}

export default JoinClass
