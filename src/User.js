import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from './store';

const User = ({ user, deleteUser }) => {
  return (
    <Fragment>
      <h5>{user.name}</h5>
      <p>{user.bio}</p>

      <div className="mb-3">
        <span className="badge badge-success">Ranked {user.rank}</span>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-warning"
          type="button"
          onClick={() => deleteUser(user.id)}
        >
          Delete
        </button>
        <Link to={`/users/${user.id}`}>Edit</Link>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: id => dispatch(deleteUser(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(User);
