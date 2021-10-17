import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({component: Component, ...props}) => {

    const isLoggedin = useSelector(state => state.AuthReducer.isLoggedIn)

    return( 
        <Route {...props}
            render={props => 
                isLoggedin ?
                    (<Component {...props} />)
                
                :
                   (<Redirect to='/login'/>)
                
                
            }

        />
    )
    
}

export default ProtectedRoute