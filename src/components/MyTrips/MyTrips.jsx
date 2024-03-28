import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import store from '../../redux/store';
import tripsReducer from '../../redux/reducers/trips.reducer';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Stack,
  Alert,
  AlertTitle,
} from '@mui/material';

import './MyTrips.css';

function MyTrips() {
  let history = useHistory();

  const dispatch = useDispatch();

  //set ID to URL ID
  const { userId } = useParams();

  //retrieve logged-in user info:
  const user = useSelector((store) => store.user.id);

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

  const trips = useSelector((store) => store.tripsReducer.trips); // Access   trips from tripsReducer

  const tripsList = trips.trips;

  if (!Array.isArray(trips) || trips.length === 0) {
    return (
      <>
        <div>No trips to display</div>
        <Button onClick={newTrip} variant="outlined">
          New Trip
        </Button>
      </>
    );
  }

  //function to get range of dates in the selected trip
  function viewTrip(id) {
    history.push(`/viewtrip/${id}`);
  }

  //navigating to begin new trip
  function newTrip() {
    history.push(`/location`);
  }

  function deleteTrip(id) {
    console.log('trying to delete trip: ', id);
    //return <Alert severity="warning">This is a warning Alert.</Alert>;
    dispatch({ type: 'DELETE_TRIP', payload: id });
  }

  //navigating to edit trip
  function editTrip(id) {
    console.log('editing trip: ', id);
    history.push(`/edittrip/${id}`);
  }

  return (
    <div>
      {/* Display trips */}
      <h1>User ID is: {user}</h1>
      <h1>URL ID is: {userId}</h1>
      <section className="tripcards">
        {trips.map((trip) => (
          <Box key={trip.trip_id} width="400px" className="card">
            <CardContent className="cardcontent">
              <Typography variant="h5">
                Location: {trip.trip_location}
              </Typography>
              Start: {trip.trip_start}, End: {trip.trip_end}
            </CardContent>
            <Button onClick={() => viewTrip(trip.trip_id)}>View</Button>
            <Button onClick={() => editTrip(trip.trip_id)}>EDIT</Button>
            <Button onClick={() => deleteTrip(trip.trip_id)}>DELETE</Button>
          </Box>
        ))}
      </section>

      <Button onClick={newTrip} variant="outlined">
        New Trip
      </Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MyTrips;
