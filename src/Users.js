import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './store';
import User from './User';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let {location, users, topRanked} = this.props;
    if(location.pathname === '/users/topRanked') users = topRanked;

    return (
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <User user={user} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    topRanked: state.topRanked,
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
)(Users);
