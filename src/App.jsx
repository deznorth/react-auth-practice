import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import PRoute from './components/ProtectedRoute/ProtectedRoute';

import LoginPage from './pages/login/login';
import SecretPage from './pages/secret/secret';
import ErrorPage from './pages/error/error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="jumbotron">
            <Switch>
              <Route path='/' component={LoginPage} exact />
              <PRoute path='/secret' component={SecretPage} exact />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
