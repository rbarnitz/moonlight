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
  let history = useHistory();
  const user = useSelector((store) => store.user.id);

  //retrieve trip data to display
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/viewtrip/${id}`);
        setTrip(response.data[0]);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTrip();
  }, [id]);

  const trips = useSelector((store) => store.tripsReducer.trips); // Access   trips from tripsReducer
  console.log('trip info: ', trip);

  function submitEdit() {
    console.log('editing trip: ', tripInfo);
    dispatch({ type: 'EDIT_TRIP', payload: tripInfo });
  }

  return (
    <div>
      <p>Edit here</p>
      <p>Location {trip.trip_location}</p>
      <p>Trip Start {trip.trip_start}</p>
      <p>Trip End {trip.trip_end}</p>

      <Button onClick={submitEdit} variant="outlined">
        Submit Changes
      </Button>
    </div>
  );
}

export default EditTrip;
