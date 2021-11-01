/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Image } from 'react-bootstrap'

const Anuncios = ({ actividad }) => {
  return (
     <div className='custom_link' >
     <div className="amt">
          <div className="amt__Cnt ">
               <div className="amt__top">

                    <Image
                         roundedCircle
                         style={{
                           width: '50px',
                           height: '50px'
                         }}
                         src={
                         actividad.creador.avatar ||
                         'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg'
                         }
                         alt="creador"
                    />
                    <div>{actividad.creador.nombre} {actividad.creador.apellido}</div>
               </div>
               <p className="amt__txt">{actividad.contenido}</p>
               <div className='d-flex mx-2'>
               {
                    actividad.Archivos && actividad.Archivos.map((archivo, idx) => {
                      const ext = archivo.Nombre.split('.')[1].toLowerCase()
                      return (
                         <>
                              <div className='info_archivos shadow mx-1' key={idx}>
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

                              </>
                      )
                    })
               }
               </div>

          </div>
     </div>
</div>

  )
}

export default Anuncios
