import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const navTabs = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Create A User', path: '/users/create' },
  { name: 'Top Ranked', path: '/users/topRanked' },
];

const Nav = ({ location, users }) => {
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
              ? `${navTab.name} (${users.length})`
              : navTab.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(Nav);
