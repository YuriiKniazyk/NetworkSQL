import React, {Component} from 'react';
import './App.css';
import {Route}  from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home  from './components/home';
import CreateUser from './components/creatUser'
import Layout from './components/layout'

class App extends Component {

  render() {

    return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={CreateUser} />
      </Layout>  
    </BrowserRouter>
    )
  }
  
}

export default App;