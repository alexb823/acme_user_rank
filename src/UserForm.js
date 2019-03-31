import React, { Component } from 'react';
import axios from 'axios';

export default class UserForm extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        bio: '',
        rank: '',
      },
      error: '',
    };
  }

  handleOnChange = ({ target }) => {
    const { user } = this.state;
    user[target.name] = target.value;
    this.setState({ user });
    console.log(this.state);
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { user } = this.state;
    const {history} = this.props;
    axios
      .post('api/users/create', user)
      .then(() => history.push('/users'))
      .catch(ex => this.setState({ error: ex.response.data }));
  };

  render() {
    const { name, bio, rank } = this.state.user;
    const { error } = this.state;
    const { handleOnChange, handleOnSubmit } = this;

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
            Create
          </button>
          <button className="btn btn-secondary" type="reset">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}
