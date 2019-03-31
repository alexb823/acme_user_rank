import React, {Fragment} from 'react';

const User = ({user}) => {
  return (
    <Fragment>
      <h5>{user.name}</h5>
    </Fragment>
  )
}

export default User;
