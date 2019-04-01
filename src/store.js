import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import axios from 'axios';

const initialState = {
  users: [],
  topRanked: [],
};

//action type
const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER';
const DELETED_USER_FROM_SERVER = 'DELETED_USER_FROM_SERVER';

//action creator
const gotUsersFromServer = users => {
  return {
    type: GOT_USERS_FROM_SERVER,
    users,
  };
};

const deletedUserFromServer = id => {
  return {
    type: DELETED_USER_FROM_SERVER,
    id,
  };
};

//thunks
export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => gotUsersFromServer(response.data))
      .then(action => dispatch(action))
      .catch(err => console.error(err));
  };
};

export const deleteUser = id => {
  return dispatch => {
    return axios
      .delete(`/api/users/${id}`)
      .then(() => deletedUserFromServer(id))
      .then(action => dispatch(action))
      .catch(err => console.error(err));
  };
};

// helper function to get top ranked user or users from users array
const getTopUser = users => {
  return users.reduce((acc, user) => {
    console.log(acc)
    if(!acc.length && users.length) acc = [user];
    else if (user.rank < acc[0].rank) acc = [user];
    else if (user.rank === acc[0].rank) acc.push(user);
    return acc;
  }, []);
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_FROM_SERVER:
      return {
        ...state,
        users: action.users,
        topRanked: getTopUser(state.users),
      };
    case DELETED_USER_FROM_SERVER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

export default store;
