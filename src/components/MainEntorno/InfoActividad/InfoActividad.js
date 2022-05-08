/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import 'moment/locale/es'
import './infoActividad.scss'
moment.locale('es')

const InfoActividad = ({ actividad }) => {
  return (
     <div className='info_wrapper' >
          <div className='info_title'>
               <h1>{actividad.titulo}</h1>
          </div>
          <div className='info_creador'>
               <p>{actividad.creador.nombre} {actividad.creador.nombre}</p>

              <p>Fecha de entrega:
                   {
                   actividad.fechaEntrega !== null
                     ? ` ${moment(actividad.fechaEntrega).format('LLL')}`
                     : ' Sin fecha de entrega'
                    }
              </p>

          </div>

               <hr size='2px' />

          <div className='info_contenido'>
               <pre>{actividad.contenido}</pre>
               <div className='d-flex'>
               {
                         actividad.Archivos && actividad.Archivos.map((archivo, idx) => {
                           const ext = archivo.nombre.slice((archivo.nombre.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase()
                           return (
                              <div key={idx} className='m-2'>
                                   <pre>{archivo.nombre}</pre>
                                   <div className='info_archivos shadow' >
                                        <a
                                             href={
                                                  ext === 'png' || ext === 'jpg'
                                                    ? archivo.url
                                                    : `http://docs.google.com/gview?url=${archivo.url}`
                                             }
                                             target='_blank'
                                             rel="noopener noreferrer"

                                        >
                                             <Image

                                                  src={
                                                       ext === 'png' || ext === 'jpg'
                                                         ? archivo.url
                                                         : `${process.env.REACT_APP_BACKEND}/public/placeholders/${ext}.png`

                                                  }

                                                  alt={archivo.nombre}
                                                  style={{
                                                    width: '150px',
                                                    height: '150px'
                                                  }}
                                             />
                                        </a>
                                   </div>

                                   <a href={archivo.url} >
                                        <FontAwesomeIcon icon='download' className='download' />
                                   </a>
                              </div>
                           )
                         })
                    }
               </div>

          </div>

     </div>

  )
}

export default InfoActividad
