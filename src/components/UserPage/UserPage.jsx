import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import store from '../../redux/store';

function UserPage() {
  const history = useHistory();

  function myTrips() {
    history.push('/mytrips');
  }

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <button onClick={myTrips} data-testid="toList">
        My Trips
      </button>{' '}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
