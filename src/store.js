import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import axios from 'axios';

const initialState = {
  users: [],
};

//action type
const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';

//action creator
export const gotUsersFromServer = users => {
  return {
    type: GOT_USERS_FROM_SERVER,
    users,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_SERVER:
    return { ...state, users: action.users };
    default:
    return state;
  }
};

export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => gotUsersFromServer(response.data))
      .then(action => dispatch(action))
      .catch(err => console.error(err));
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));


export default store;
