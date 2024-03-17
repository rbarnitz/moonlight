import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import store from '../../redux/store';
import tripsReducer from '../../redux/reducers/trips.reducer';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';

function MyTrips() {
  let history = useHistory();

  const dispatch = useDispatch();

  //set ID to URL ID
  const { userId } = useParams();

  //retrieve logged-in user info:
  const user = useSelector((store) => store.user.id);
  console.log('user ID is: ', user);
  console.log('URL ID is: ', userId);

  const authenticatedUserID = userId;

  // Fetch user trips on component mount
  useEffect(() => {
    //check if user is authorized for this data:

    if (user && user == userId) {
      // Dispatch FETCH_TRIPS action to get trips from the server
      dispatch({ type: 'FETCH_TRIPS', payload: userId });
    }
  }, [userId, user, dispatch]);

  // If the authenticated user does not match the URL userID, error
  if (user != userId) {
    return <div>Sorry, you are not authorized to view these trips.</div>;
  }

  //update to change when trip data changes?

  const trips = useSelector((store) => store.tripsReducer.trips); // Access   trips from tripsReducer
  console.log('store is: ', trips[0]);

  const tripsList = trips.trips;
  console.log(trips[0]);

  if (!Array.isArray(trips) || trips.length === 0) {
    return <div>No trips to display</div>;
  }

  function newTrip() {
    history.push(`/location`);
  }

  return (
    <div>
      {/* Display trips */}
      <h1>User ID is: {user}</h1>
      <h1>URL ID is: {userId}</h1>
      {trips.map((trip) => (
        <Box key={trip.trip_id} width="300px">
          <CardContent>
            <Typography variant="h5">Location: {trip.trip_location}</Typography>
            Start: {trip.trip_start}, End: {trip.trip_end}
          </CardContent>
          <CardActions>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </CardActions>
        </Box>
      ))}

      <Button onClick={newTrip} variant="outlined">
        New Trip
      </Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MyTrips;
