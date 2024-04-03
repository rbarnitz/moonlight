import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';

function EditTrip(tripInfo) {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  let history = useHistory();
  const user = useSelector((store) => store.user.id);
  const dispatch = useDispatch();

  //retrieve trip data to display
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/viewtrip/${id}`);
        setTrip(response.data[0]);
        //catch to delay display until info is retrieved
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTrip();
  }, [id]);

  const trips = useSelector((store) => store.tripsReducer.trips); // Access   trips from tripsReducer
  console.log('trip info: ', trip);
  console.log('user id is: ', user);

  function submitEdit() {
    const tripData = {
      trip_id: id,
      user_id: user,
      trip_location: 'test place',
      trip_latitude: 11.1111,
      trip_longitude: 11.111,
      timezone: 'test zone',
      trip_start: trip.trip_start,
      trip_end: trip.trip_end,
    };

    setTripData(tripData);

    console.log('editing trip: ', tripData);
    dispatch({ type: 'EDIT_TRIP', payload: tripData });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Edit here</p>
      <p>Location {trip.trip_location}</p>
      <p>Trip Start {trip.trip_start}</p>
      <p>Trip End {trip.trip_end}</p>

      <Button onClick={() => submitEdit(tripData)} variant="outlined">
        Submit Changes
      </Button>
    </div>
  );
}

export default EditTrip;
