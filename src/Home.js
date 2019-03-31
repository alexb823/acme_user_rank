import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './store';

class Home extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return <div>We have {this.props.users.length} Users!</div>;
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
)(Home);
