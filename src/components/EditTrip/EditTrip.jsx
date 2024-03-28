import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Button } from '@mui/material';

function EditTrip() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [timezone, setTimezone] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

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

  if (!trip) {
    return <div>Loading...</div>;
  }

  function submitChanges() {
    setLocation('test');
    console.log(location);

    //dispatch 'EDIT_TRIP'
  }
  console.log(trip);

  return (
    <div>
      <h1>View Trip Details</h1>
      <p>Location: {trip.trip_location}</p>
      <p>Start: {trip.trip_start}</p>
      <p>End: {trip.trip_end}</p>
      <Button
        onClick={() => {
          submitChanges;
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}

export default EditTrip;
