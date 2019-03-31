import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'

const User = ({ user }) => {
  return (
    <Fragment>
      <h5>{user.name}</h5>
      <p>{user.bio}</p>

      <div className="mb-3">
      <span className="badge badge-success">Ranked {user.rank}</span>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-warning">Delet</button>
        <Link to="/users/create">Edit</Link>
      </div>
    </Fragment>
  );
};

export default User;
