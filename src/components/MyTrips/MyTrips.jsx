import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import tripsReducer from '../../redux/reducers/trips.reducer';

function MyTrips() {
  const dispatch = useDispatch();

  //retrieve logged-in user info:
  const user = useSelector((store) => store.user.id);
  console.log('user ID is: ', user);

  const trips = useSelector((state) => state.tripsReducer); // Access trips from tripsReducer
  console.log('store is: ', trips);

  // Fetch user trips on component mount
  useEffect(() => {
    // Dispatch FETCH_TRIPS action to fetch trips from the server
    dispatch({ type: 'FETCH_TRIPS', payload: user });
  }, [user]);
  //update to change when trip data changes?

  return (
    <div>
      {/* Display trips */}
      <h1>User ID is: {user}</h1>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MyTrips;
