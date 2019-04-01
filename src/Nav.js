import React from 'react';
import { Link } from 'react-router-dom';


const Nav = ({location, numUsers, topNames}) => {

  const navTabs = [
    { name: 'Home', path: '/'},
    { name: 'Users', path: '/users', info: numUsers },
    { name: 'Create A User', path: '/users/create'},
    { name: 'Top Ranked', path: '/users/topRanked', info: topNames },
  ];

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
            {navTab.name} {navTab.info && `(${navTab.info})`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
