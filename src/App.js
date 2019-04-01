import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Users from './Users';
import Home from './Home';
import UserForm from './UserForm';
import { fetchUsers } from './store';

class App extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, topRanked, numUsers, topNames } = this.props;

    return (
      <div className="container mb-3">
        <h1 className="my-4">Acme Users With Ranks</h1>
        <HashRouter>
          <Route
            render={({ location }) => (
              <Nav location={location} numUsers={numUsers} topNames={topNames} />
            )}
          />

          <Route exact path="/" render={() => <Home numUsers={numUsers} />} />

          <Route exact path="/users" render={() => <Users users={users} />} />

          <Route
            exact
            path="/users/topRanked"
            render={() => <Users users={topRanked} />}
          />

          <Route
            exact
            path="/users/create"
            render={({ history }) => <UserForm history={history} />}
          />
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    topRanked: state.topRanked,
    numUsers: state.users.length,
    topNames: state.topRanked.map(user => user.name).join(' '),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
