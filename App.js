import './App.css';
import {Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home-Page/Home';
import Registration from './components/Registration-page/RegistrationPage';
import User from './components/User-page/UserPage';
import Logout from './components/User-page/Logout';
import LoginPage from './components/Login-page/Login.component';
import UserUpdate from './components/User-page/UserUpdate';
import Forgot from './components/ForgotPassword-Page/Forgotpwd';
import Reset from './components/ForgotPassword-Page/Reset';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/userupdate" component={UserUpdate}/>
        <Route exact path="/forgot" component={Forgot}/>
        <Route exact path="/reset" component={Reset}/>
      </Switch>
    </Router>
  );
}

export default App;
