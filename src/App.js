import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Nav from './Nav';

export default class App extends Component {
  render() {
    return(
      <div className="container">
      <h1 className="my-4">Acme Users With Ranks</h1>
      <HashRouter>
        <Route render={({location})=> <Nav location={location} />} />
        <Route path='/' render={() => <div>We have 3 Users!</div>} />

      </HashRouter>
      </div>
    )
  }
}
