import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './store';
import User from './User';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <ul className="list-group">
        {this.props.users.map(user => (
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
