import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import store from '../../redux/store';
import tripsReducer from '../../redux/reducers/trips.reducer';

function MyTrips() {
  const dispatch = useDispatch();

  //set ID to URL ID
  const { userId } = useParams();

  //retrieve logged-in user info:
  const user = useSelector((store) => store.user.id);
  console.log('user ID is: ', userId);

  const trips = useSelector((state) => state.tripsReducer); // Access trips from tripsReducer
  console.log('store is: ', trips);

  // Fetch user trips on component mount
  useEffect(() => {
    // Dispatch FETCH_TRIPS action to get trips from the server
    dispatch({ type: 'FETCH_TRIPS', payload: userId });
  }, [userId]);
  //update to change when trip data changes?

  return (
    <div>
      {/* Display trips */}
      <h1>User ID is: {user}</h1>
      <h1>URL ID is: {userId}</h1>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MyTrips;
