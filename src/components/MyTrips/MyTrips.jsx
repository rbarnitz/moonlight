import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function MyTrips() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  //const user = useSelector((store) => store.user);
  //Try: const trips = useSelector((store) => store.user.trips) or store.trips ;
  return (
    <div className="container">
      <h1>My Trips:</h1>
      {/* <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MyTrips;
