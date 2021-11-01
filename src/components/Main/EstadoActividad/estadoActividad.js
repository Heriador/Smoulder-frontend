/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { crearArchivo } from '../../../store/actions/archivo'
import ArchivoService from '../../../Services/ArchivoService'
import './estadoActividad.scss'
import ActividadService from '../../../Services/ActividadService'

const EstadoActividad = ({ actividad }) => {
  const dispatch = useDispatch()
  const fileUpload = useRef()

  const [file, setFile] = useState('')

  const archivo = useSelector(state => state.ArchivoReducer.archivo)

  const handleSubmit = async (e) => {
    const data = new FormData()
    data.append('file', file)
    data.append('actividadId', actividad.id)
    dispatch(crearArchivo(data))
    if (Object.keys(archivo).length > 0) {
      await ActividadService.actualizar({ estado: 'entregada', actividadId: actividad.id })
    }
    //     await ArchivoService.crear(data)
  }

  const color = Object.keys(archivo).length > 0 ? 'success' : 'primary'

  return (

     <div className='wrapper'>
          <div className='upload_wrapper'>
               <div className='upload_info'>
                    <h3>Tu Trabajo</h3>
                    <p className={`text-${color}`}>
                         {
                              Object.keys(archivo).length > 0
                                ? 'Entregada'
                                : 'Asignada'
                         }

                    </p>
               </div>
               {
                    (file.name || Object.keys(archivo).length !== 0) &&
                    <div id='info_file'>
                         <p>{file.name || archivo.Nombre }</p>
                         <FontAwesomeIcon
                              onClick={() => setFile('')}

                              icon='times'
                              className='fa-icon'
                         />
                    </div>
               }
               <Button
                    variant='outline-dark'
                    onClick={() => fileUpload.current.click()}
               >
                    Añadir Archivo
               </Button>
               <Button variant='primary' onClick={handleSubmit}>
                    {
                         file ? 'Entregar Archivo' : 'Marcar como entregado'
                    }

               </Button>
          </div>
          <input
               hidden
               type="file" ref={fileUpload}
               // value={file}
               onChange={(e) => {
                 console.log(e.target.files[0])
                 setFile(e.target.files[0])
               }}
          />
     </div>

  )
}

export default EstadoActividad
