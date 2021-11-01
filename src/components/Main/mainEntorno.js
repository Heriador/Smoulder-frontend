/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { Form, Image, FloatingLabel, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createAnuncio, obtenerActividades, createActividad } from '../../store/actions/actividades'
import backImage from '../../assets/backImage.jpg'

import MostrarAnuncios from './MostrarAnuncios/mostrarAnuncios'
import moment from 'moment'
import './main.scss'

const MainEntorno = ({ entorno, user }) => {
  const dispatch = useDispatch()
  const [showInput, setShowInput] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [textoActvidad, setTextoActvidad] = useState('')
  const [archivos, setArchivos] = useState([])
  const [tipoActividad, setTipoActividad] = useState('Anuncio')
  const [fecha, setFecha] = useState('')

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

    switch (tipoActividad) {
      case 'Anuncio':
        await dispatch(createAnuncio(data))
        break

      case 'Actividad':
        entorno.Usuarios.length > 0 && entorno.Usuarios.map((usuario) => data.append('listaUsuarios', usuario.id))
        await dispatch(createActividad(data))
        break

      default:
        break
    }

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
                    {/* <div className="main__status">
                        <p>Upcoming</p>
                        <p className="main__subText">No work due</p>
                    </div> */}
                   <div className="main__announcements">
                   <div className="main__announcementsWrapper">
                        <div className="main__ancContent">
                            {
                                showInput
                                  ? (
                                      <div className="main__form">
                                            <Form onSubmit={hanldeSubmit}>
                                                {
                                                    user.Rol.nombre === 'jefe' &&
                                                    <div className='d-flex w-100'>
                                                    <Form.Group className='mb-2 w-100'>
                                                        <Form.Select onChange={(e) => setTipoActividad(e.target.value)}>
                                                            <option >
                                                                Anuncio
                                                            </option>
                                                            <option>Actividad</option>
                                                        </Form.Select>
                                                    </Form.Group>
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
                                                                  console.log(e.target.value)
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
                                                    </div>
                                                }
                                                {
                                                    tipoActividad === 'Actividad' &&
                                                    <Form.Group controlId="titulo" className='mb-2'>
                                                    <Form.Control
                                                        type='text'
                                                        placeholder='Titulo'
                                                        value={titulo}
                                                        onChange={(e) => setTitulo(e.target.value)}
                                                    />
                                                </Form.Group>
                                                }
                                                <Form.Group controlId="formBasicEmail">
                                                    <FloatingLabel label='Announce Something to Class'>
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
                                  : <div className="main__wrapper100"
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
                                        <div>Announce Something to Class</div>
                                    </div>
                            }

                        </div>
                    </div>
                    {
                        <MostrarAnuncios entorno={entorno} />

                    }
                   </div>
                </div>
            </div>
        </div>
  )
}

export default MainEntorno
