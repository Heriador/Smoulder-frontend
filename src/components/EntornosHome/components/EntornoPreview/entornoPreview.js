/* eslint-disable react/prop-types */
import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import foto from '../../../../assets/photo.png'
import './entornoPreview.scss'

const EntornoPreview = ({ entorno, eliminar }) => {
  const user = useSelector(state => state.AuthReducer.user)

  return (

    <li className="joined__list">
      <div className="joined__wrapper w-100">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to={`/${entorno.id}`}>
              <h2>{entorno.titulo}</h2>
              <p className="joined__owner">{entorno.descripcion}</p>
            </Link>
            <p className="joined__owner">{entorno.creador.fullName}</p>
          </div>
        </div>
        <Image
          className="joined__avatar"
          roundedCircle
          src={ entorno.creador.avatar || foto }
          alt="creador"
        />
      </div>
      {
        user.Rol.nombre === 'jefe' &&
        <div className='m-2'>
          < FontAwesomeIcon icon='trash'
            onClick={() => {
              eliminar(entorno.id)
            }}
          />
      </div>
      }
    </li>
  )
}

export default EntornoPreview
