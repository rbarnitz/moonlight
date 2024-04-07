import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Box,
  InputAdornment,
  TextField,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateTime } from 'luxon';
import { DayPicker } from 'react-day-picker';
import './EditTrip.css';

function EditTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for the date range
  const [range, setRange] = useState({
    from: null,
    to: null,
  });

  let history = useHistory();
  const user = useSelector((store) => store.user.id);
  const dispatch = useDispatch();

  // Fetch trip data on component mount
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/viewtrip/${id}`);
        setTrip(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTrip();
  }, [id]);

  // Footer content based on selected date range
  let footer = <p>New Dates:</p>;
  if (range.from) {
    if (!range.to) {
      footer = <p>{range.from.toLocaleDateString()}</p>;
    } else if (range.to) {
      let formatStart = formatDate(range.from.toLocaleDateString());
      footer = (
        <>
          <p>
            Selected dates: {range.from.toLocaleDateString()} -{' '}
            {range.to.toLocaleDateString()}
          </p>
        </>
      );
    }
  }

  // Function to handle form submission
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

    console.log('Editing trip:', tripData);
    dispatch({ type: 'EDIT_TRIP', payload: tripData });
  }

  //format shown dates
  function formatDate(dateInput) {
    const dateTime = DateTime.fromISO(dateInput, { zone: 'utc' });
    return dateTime.toFormat('MM/dd/yyyy');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <Box className="center" width="600px" p={2}>
          <TextField
            id="outlined-basic"
            label="Enter Location"
            variant="outlined"
            type="text"
            color="success"
            defaultValue={trip.trip_location}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <DayPicker
          mode="range"
          min={2}
          max={6}
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />

        <div className="center">
          <Box width="450px" height="100px">
            <p>
              Current dates: {formatDate(trip.trip_start)} -{' '}
              {formatDate(trip.trip_end)}
            </p>
            <p>{footer}</p>
          </Box>
        </div>
        <Button onClick={submitEdit} variant="outlined">
          Submit Changes
        </Button>
      </div>
    </div>
  );
}

export default EditTrip;
