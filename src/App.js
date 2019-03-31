import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import Users from './Users';
import Home from './Home';
import UserForm from './UserForm';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Acme Users With Ranks</h1>
        <HashRouter>
          <Route render={({ location }) => <Nav location={location} />} />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/create" render={({history}) => <UserForm history={history} />} />
        </HashRouter>
      </div>
    );
  }
}
