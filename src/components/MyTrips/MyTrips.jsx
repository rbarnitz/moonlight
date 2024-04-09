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
        <Button
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.19)', // Transparent white
          }}
          onClick={newTrip}
          variant="outlined"
        >
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
    //console.log('trying to delete trip: ', id);

    //return <Alert severity="warning">This is a warning Alert.</Alert>;

    dispatch({ type: 'DELETE_TRIP', payload: id });

    //refresh trips to reflect delete
    //console.log('dispatching fetch to ', userId);
    dispatch({ type: 'FETCH_TRIPS', payload: userId });
  }

  //navigating to edit trip
  function editTrip(id) {
    console.log('editing trip: ', id);
    history.push(`/edittrip/${id}`);
  }

  //allow date objects to be formatted as they are mapped
  function formatDate(dateInput) {
    const dateTime = DateTime.fromISO(dateInput, { zone: 'utc' });
    return dateTime.toFormat('MMMM d, yyyy');
  }

  return (
    <div>
      <div className="trips-button">
        {/* Display trips */}
        <h1>My Trips:</h1>
        <Button
          className="trips-button"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.12)', // Transparent white
          }}
          onClick={newTrip}
          variant="outlined"
        >
          {' '}
          New Trip
        </Button>
      </div>

      <section className="tripcards">
        {trips.map((trip) => (
          <Box
            key={trip.trip_id}
            width="400px"
            className="card"
            sx={{
              border: '1px solid #ccc',
            }}
          >
            <CardContent className="cardcontent">
              <Typography variant="h5">{trip.trip_location}</Typography>
              {formatDate(trip.trip_start)} - {formatDate(trip.trip_end)}
            </CardContent>
            <Button
              className="options-button"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.19)', // Transparent white
              }}
              onClick={() => viewTrip(trip.trip_id)}
            >
              View
            </Button>
            <Button
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.19)', // Transparent white
                margin: '0 10px', // Add margin around the button
              }}
              onClick={() => editTrip(trip.trip_id)}
            >
              EDIT
            </Button>
            <Button
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.19)', // Transparent white
              }}
              onClick={() => deleteTrip(trip.trip_id)}
            >
              DELETE
            </Button>
          </Box>
        ))}
      </section>
    </div>
  );
}

export default MyTrips;
