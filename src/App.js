/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import Login from './components/Auth/login'
import Register from './components/Auth/register'
import Home from './components/EntornosHome/Home'
import ProtectedRoute from './components/Routes/protectedRoute'
import Actividades from './components/MainEntorno/Actividades/actividades'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CalificarActividades from './components/Routes/CalificarActividades/calificarActividades'
import Entorno from './components/Routes/Entorno/entorno'
import IntegrantesEntorno from './components/Routes/IntegrantesEntorno/integrantesEntorno'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  const entornos = useSelector(state => state.EntornoReducer.entornos)
  const actividades = useSelector(state => state.ActividadesReducer.actividades)

  return (
    <Router>
      <div className="App">
       <Switch>
         { // Rutas Entorno
           entornos.map((entorno, idx) => (
             <ProtectedRoute
              key={`${idx}ent`}
              exact path={`/${entorno.id}`}
              component={Entorno}
              entorno={entorno}
             />
           ))
         }
         { // Rutas calificar actividades
           entornos.map((entorno, idx) => (
             <ProtectedRoute key={`${idx}calfactividad`} exact path={`/${entorno.id}/actividades`} component={CalificarActividades} entorno={entorno}/>
           ))
         }
         { // Rutas integrantes entorno
           entornos.map((entorno, idx) => (
             <ProtectedRoute key={`${idx}integrantes`} exact path={`/${entorno.id}/integrantes`} component={IntegrantesEntorno} entorno={entorno}/>
           ))
         }
         { // Rutas actividades
              actividades.map((actividad, idx) => (
                <ProtectedRoute key={`${idx}actividad`} exact path={`/${actividad.entornoId}/${actividad.id}`} component={Actividades} actividad={actividad} entorno={actividad.entornoId}/>
              ))

          }
         <ProtectedRoute exact path='/' component={Home}/>
         <Route exact path='/login' component={Login} />
         <Route exact path='/register' component={Register} />

       </Switch>
      </div>
    </Router>
  )
}

export default App
