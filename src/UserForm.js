import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchUsers } from './store';

class UserForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    if (this.props.user) {
      this.state = {
        user: this.props.user,
        error: '',
      };
    } else {
      this.state = {
        user: {
          name: '',
          bio: '',
          rank: '',
        },
        error: '',
      };
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps)
  // }

  handleOnChange = ({ target }) => {
    const { user } = this.state;
    user[target.name] = target.value;
    this.setState({ user });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { user } = this.state;
    const { history, fetchUsers, id } = this.props;

    axios[id ? 'put' : 'post'](`api/users/${id ? id : 'create'}`, user)
      .then(() => fetchUsers())
      .then(() => history.push('/users'))
      .catch(ex => this.setState({ error: ex.response.data }));
  };

  render() {
    const { name, bio, rank } = this.state.user;
    const { error } = this.state;
    const { handleOnChange, handleOnSubmit } = this;
    const editing = !!this.props.user;

    return (
      <form onSubmit={handleOnSubmit}>
        {error && (
          <div className="alert alert-danger">
            <ul>
              {error.split(',').map(err => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="bio"
            value={bio}
            placeholder="bio"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="rank"
            value={rank}
            placeholder="rank"
            onChange={handleOnChange}
          />
        </div>

        <div className="btn-group" role="group">
          <button className="btn btn-primary" type="submit">
            {editing ? 'Edit' : 'Create'}
          </button>
          <Link to="/users" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserForm);
