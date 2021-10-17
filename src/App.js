import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Class from './components/Class/Class';
import ProtectedRoute from './components/Routes/protectedRoute';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
       <Switch>
         <ProtectedRoute exact path='/' component={Class}/>
         <Route exact path='/login' component={Login} />
         <Route exact path='/register' component={Register} />
       </Switch>
      </div>
    </Router>
  );
}

export default App;
