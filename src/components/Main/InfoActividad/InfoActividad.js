/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Moment from 'react-moment'
import moment from 'moment'
import 'moment/locale/es'
import './infoActividad.scss'
moment.locale('es')

const InfoActividad = ({ actividad }) => {
  moment.locale('es-mx')
  return (
     <div className='info_wrapper' >
          <div className='info_title'>
               <h1>{actividad.titulo}</h1>
          </div>
          <div className='info_creador'>
               <p>{actividad.creador.nombre} {actividad.creador.nombre}</p>

              <p>Fecha de entrega: {moment(actividad.fechaEntrega).format('LLL')}</p>

          </div>

               <hr size='2px' />

          <div className='info_contenido'>
               <pre>{actividad.contenido}</pre>
                    {
                         actividad.Archivos && actividad.Archivos.map((archivo, idx) => {
                           const ext = archivo.Nombre.split('.')[1].toLowerCase()
                           return (
                              <>
                                   <div className='info_archivos shadow' key={idx}>
                                        <a
                                             href={
                                                  ext === 'png' || ext === 'jpg'
                                                    ? archivo.url
                                                    : `http://docs.google.com/gview?url=${archivo.url}`
                                             }
                                             target='_blank'
                                             rel="noopener noreferrer"
                                             key={idx}
                                        >
                                             <Image

                                                  src={
                                                       ext === 'png' || ext === 'jpg'
                                                         ? archivo.url
                                                         : `http://localhost:8080/public/placeholders/${archivo.Nombre.split('.')[1].toLowerCase()}.png`

                                                  }

                                                  alt={archivo.Nombre}
                                                  style={{
                                                    width: '150px',
                                                    height: '150px'
                                                  }}
                                             />
                                        </a>
                                   </div>

                                   <a href={archivo.url} key={idx}>
                                        <FontAwesomeIcon icon='download' className='download' />
                                   </a>
                              </>
                           )
                         })
                    }

          </div>

     </div>

  )
}

export default InfoActividad
