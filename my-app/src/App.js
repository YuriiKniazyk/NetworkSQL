import React, {Component} from 'react';
import './App.css';
import {Route}  from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home  from './components/home/home';
import CreateUser from './components/createUser/creatUser';
import Layout from './components/layout/layout';
import LogiUser from './components/logiUser/loginUser';
import Profile from './components/profile/profile';
import ProfileId from './components/profile/profileId';

class App extends Component {

  render() {

    return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={CreateUser} />
        <Route path='/login' component={LogiUser} />
        <Route path='/profile' component={Profile} />
        <Route path='/userprofile/:id' component={ProfileId} />
      </Layout>  
    </BrowserRouter>
    )
  }
  
}

export default App;