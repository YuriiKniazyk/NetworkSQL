import React, {Component} from 'react';
import './App.css';
import {Route}  from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home  from './components/headers/home/home';
import CreateUser from './components/user/createUser/creatUser';
import Layout from './components/headers/layout/layout';
import LogiUser from './components/user/loginUser/loginUser';
import Profile from './components/user/profile/profile';
import ProfileId from './components/user/profile/profileId';
import ForgotePassword from './components/forgotePassword/forgotePassword';
import CodeAndEmail from './components/forgotePassword/sendCodeAndEmail';
import UpdatePassword from './components/forgotePassword/updatePassword';
import Logout from './components/headers/logout/logout';

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={CreateUser} />
          <Route path='/login' component={LogiUser} />
          <Route path='/logout' component={Logout} />
          <Route path='/profile' component={Profile} />
          <Route path='/userprofile/:id' component={ProfileId} />
          <Route path='/forgotePassword' component={ForgotePassword} />
          <Route path='/setpassword' component={CodeAndEmail} />
          <Route path='/setpasswordandupdate' component={UpdatePassword} />
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App;