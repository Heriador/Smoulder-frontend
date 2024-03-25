/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Home from './components/EntornosHome/Home';
import { ProtectedRoute } from './components/Routes/protectedRoute';
// import ProtectedRoute from './components/Routes/protectedRoute';
import Actividades from './components/MainEntorno/Actividades/actividades';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CalificarActividades from './components/Routes/CalificarActividades/calificarActividades';
import Entorno from './components/Routes/Entorno/entorno';
import IntegrantesEntorno from './components/Routes/IntegrantesEntorno/integrantesEntorno';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const entornos = useSelector((state) => state.EntornoReducer.entornos);
  const actividades = useSelector(
    (state) => state.ActividadesReducer.actividades
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          {
            // Rutas Entorno
            entornos.map((entorno, idx) => {
              return (
                <Route
                  key={`${idx}ent`}
                  exact
                  path={`/${entorno.id}`}
                  element={
                    <ProtectedRoute>
                      <Entorno entorno={entorno} />
                    </ProtectedRoute>
                  }
                />
              );
            })
          }
          {
            // Rutas calificar actividades
            entornos.map((entorno, idx) => (
              <Route
                key={`${idx}calfactividad`}
                exact
                path={`/${entorno.id}/actividades`}
                element={
                  <ProtectedRoute>
                    <CalificarActividades entorno={entorno} />
                  </ProtectedRoute>
                }
              />
            ))
          }
          {
            // Rutas integrantes entorno
            entornos.map((entorno, idx) => (
              <Route
                key={`${idx}integrantes`}
                exact
                path={`/${entorno.id}/integrantes`}
                element={
                  <ProtectedRoute>
                    <IntegrantesEntorno entorno={entorno} />
                  </ProtectedRoute>
                }
              />
            ))
          }
          {
            // Rutas actividades
            actividades.map((actividad, idx) => (
              <Route
                key={`${idx}actividad`}
                exact
                path={`/${actividad.entornoId}/${actividad.id}`}
                element={
                  <ProtectedRoute>
                    <Actividades
                      actividad={actividad}
                      entorno={actividad.entornoId}
                    />
                  </ProtectedRoute>
                }
              />
            ))
          }
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
