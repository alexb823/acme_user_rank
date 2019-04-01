import React from 'react';
import User from './User';

const Users = ({ users }) => {

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

export default Users;
