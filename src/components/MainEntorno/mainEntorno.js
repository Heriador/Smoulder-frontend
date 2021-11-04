/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Form, Image, FloatingLabel, Button, Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { obtenerActividades, createActividad } from '../../store/actions/actividades'
import backImage from '../../assets/backImage.jpg'

import MostrarActividades from './MostrarActividades/mostrarActividades'
import moment from 'moment'
import './main.scss'

const MainEntorno = ({ entorno, user }) => {
  const dispatch = useDispatch()
  const [showInput, setShowInput] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [textoActvidad, setTextoActvidad] = useState('')
  const [archivos, setArchivos] = useState([])
  const [fecha, setFecha] = useState('')
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [todos, setTodos] = useState(true)

  const handleClick = (id) => {
    setListaUsuarios([...listaUsuarios, id])
  }

  useEffect(() => {
    dispatch(obtenerActividades(entorno.id))
  }, [dispatch, entorno.id])

  const hanldeSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('titulo', titulo)
    data.append('contenido', textoActvidad)
    data.append('entornoId', entorno.id)
    fecha !== '' && data.append('fecha', fecha)
    archivos.length > 0 && archivos.forEach(file => data.append('files', file))

    todos
      ? entorno.Usuarios.length > 0 && entorno.Usuarios.map((usuario) => data.append('listaUsuarios', usuario.id))
      : listaUsuarios.length > 0 && listaUsuarios.map((usuario) => data.append('listaUsuarios', usuario))

    await dispatch(createActividad(data))

    setShowInput(false)
    setTitulo('')
    setTextoActvidad('')
    setArchivos('')
  }

  return (
        <div className="main">
            <div className="main__wrapper">
                <div className="main__content">
                    <div className="main__wrapper1">
                        <div className="main__bgImage" style={{ backgroundImage: backImage }}>
                            <div className="main__emptyStyles" />
                        </div>
                        <div className="main__text">
                            <h1 className="main__heading main__overflow">
                                {entorno.titulo}
                            </h1>
                            <div className="main__section main__overflow">
                                {entorno.descripcion}
                            </div>
                            <div className="main__wrapper2">
                                <em className="main__code">Codigo Entorno :</em>
                                <div className="main__id">{entorno.id}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main__announce">
                   <div className="main__announcements">
                   <div className="main__announcementsWrapper">
                        <div className="main__ancContent">
                            {
                                user.Rol.nombre === 'jefe' &&
                                    showInput
                                  ? (
                                        <div className="main__form">
                                                <Form onSubmit={hanldeSubmit}>
                                                    {
                                                        user.Rol.nombre === 'jefe' &&
                                                        <div className='d-flex w-100'>
                                                            <div className='mb-2 w-50'>
                                                                <Dropdown autoClose='outside' >
                                                                        <Dropdown.Toggle variant='outline-primary' >
                                                                            {
                                                                                fecha ? moment(fecha).format('LL') : 'Sin Fecha de entrega'
                                                                            }
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu>
                                                                            <Dropdown.Item onClick={() => setFecha('')}>
                                                                                {
                                                                                    fecha && 'Sin Fecha de entrega'
                                                                                }
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item as={Form.Control} type='date' onChange={(e) => {
                                                                              setFecha(e.target.value)
                                                                            }}
                                                                                style={{
                                                                                  border: 'none',
                                                                                  backgroundColor: 'transparent',
                                                                                  outline: 'none',
                                                                                  borderBottom: '1px solid #ccc'

                                                                                }}
                                                                            />
                                                                        </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                            <div className='w-50'>
                                                                <Dropdown>
                                                                    <Dropdown.Toggle>
                                                                        Seleccionar Empleados
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu >
                                                                        {
                                                                            entorno.Usuarios.length > 0
                                                                              ? <>
                                                                            <Form.Check className='m-1 d-flex' >
                                                                                <Form.Check.Input type='checkbox' defaultChecked onClick={(e) => setTodos(!todos)} />
                                                                                <Form.Check.Label> Todos los Empleados </Form.Check.Label>
                                                                            </Form.Check>
                                                                            <hr size='2px' />
                                                                            </>
                                                                              : <Dropdown.Item>No hay empleados</Dropdown.Item>
                                                                        }

                                                                    {
                                                                        entorno.Usuarios.map((usuario) => (
                                                                            <Form.Check key={usuario.id} as={Dropdown.Item} className='m-1 d-flex' >
                                                                                <Form.Check.Input type='checkbox' onClick={() => handleClick(usuario.id)}/>
                                                                                <Form.Check.Label> {usuario.fullName} </Form.Check.Label>
                                                                            </Form.Check>

                                                                        ))
                                                                    }

                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>

                                                        </div>
                                                    }
                                                    <Form.Group controlId="titulo" className='mb-2'>
                                                        <Form.Control
                                                            type='text'
                                                            placeholder='Titulo'
                                                            value={titulo}
                                                            onChange={(e) => setTitulo(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <FloatingLabel label='Descripcion Actividad'>
                                                            <Form.Control
                                                                as="textarea"
                                                                placeholder="Leave a comment here"
                                                                style={{ height: '200px' }}
                                                                value={textoActvidad}
                                                                onChange={(e) => setTextoActvidad(e.target.value)}
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <div className='main__buttons mt-2'>
                                                        <Form.Group controlId="formBasicPassword">
                                                            <Form.Control
                                                                type="file"
                                                                placeholder="Attach a file"
                                                                multiple
                                                                onChange={(e) => {
                                                                  setArchivos([
                                                                    ...e.target.files,
                                                                    ...archivos
                                                                  ])
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    <div className='d-flex justify-content-between w-25'>
                                                            <Button variant='outline-light' className='text-dark' onClick={() => setShowInput(false)} >
                                                                Cancel
                                                            </Button>
                                                            <Button variant="success" type="submit" >
                                                                Publicar
                                                            </Button>
                                                    </div>
                                                    </div>
                                                </Form>
                                        </div>
                                    )
                                  : user.Rol.nombre === 'jefe' && <div className="main__wrapper100"
                                            onClick={() => setShowInput(true)}
                                        >
                                            <Image
                                                roundedCircle
                                                alt='profile'
                                                style={{
                                                  width: '50px',
                                                  height: '50px'
                                                }}
                                                src={ user.avatar || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg'}
                                            />
                                            <div>Ingresa una nueva actividad</div>
                                        </div>
                            }

                        </div>
                    </div>
                    {
                        <MostrarActividades entorno={entorno} />

                    }
                   </div>
                </div>
            </div>
        </div>
  )
}

export default MainEntorno
