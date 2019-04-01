import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchUsers} from './store';

const navTabs = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Create A User', path: '/users/create' },
  { name: 'Top Ranked', path: '/users/topRanked' },
];


class Nav extends Component {
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  render(){
    const { location, numUsers } = this.props;
    
    return (
    <ul className="nav nav-tabs mb-4">
      {navTabs.map(navTab => (
        <li key={navTab.name} className="nav-item">
          <Link
            to={navTab.path}
            className={`nav-link ${
              navTab.path === location.pathname ? 'active' : ''
            }`}
          >
            {navTab.name === 'Users'
              ? `${navTab.name} (${numUsers})`
              : navTab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
  }
  
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(null, mapDispatchToProps)(Nav);
