/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, actividad, entorno, ...props }) => {
  const isLoggedin = useSelector(state => state.AuthReducer.isLoggedIn)
  return (
        <Route {...props}
            render={props =>
              isLoggedin
                ? (<Component {...props} actividad={actividad || null} entorno={entorno || null}/>)

                : (<Redirect to='/login'/>)

            }

        />
  )
}

export default ProtectedRoute
