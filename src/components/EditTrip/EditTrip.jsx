import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  TextField,
  IconButton,
  Typography,
  Paper,
  Stack,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { format } from 'date-fns';
import { DateTime, Interval } from 'luxon';
import { DayPicker } from 'react-day-picker';
import './EditTrip.css';

function EditTrip(tripInfo) {
  const { id } = useParams();
  const [trip, setTrip] = useState('');
  const [tripData, setTripData] = useState('');
  const [loading, setLoading] = useState(true);

  //location states
  const [townName, setTownName] = useState('');
  const [locationInfo, setLocationInfo] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [resultName, setResultName] = useState(' ');
  const [coordinates, setCoordinates] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [timezone, setTimezone] = useState('');

  //setting search changes
  const handleInputChange = (event) => {
    setTownName(event.target.value);
  };

  //set up async function for API testing
  const handleSearch = async () => {
    console.log('search for: ', townName);

    //API call
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          townName
        )}&key=c5bf905a37154ab79398510f969d8f54`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch API result');
      }

      const APIResponse = await response.json();

      //declare result name:
      let searchedLocation = APIResponse.results[0].formatted;

      //declaring latitude & longitude data:
      let lat = APIResponse.results[0].geometry.lat;
      let lng = APIResponse.results[0].geometry.lng;

      //declaring timezone data & retrieving offset time timezone info
      let timezoneSearch =
        APIResponse.results[0].annotations.timezone.offset_string;

      //display next button
      setSearchSuccess(true);
      setResultName(searchedLocation);
      setTimezone(timezoneSearch);
      setLongitude(lat);
      setLatitude(lng);
    } catch (error) {
      console.error(error.message);
      setCoordinates(null);
    }
  };

  // State for the date range
  const [range, setRange] = useState({
    from: null,
    to: null,
  });

  //declare date variables:
  let startDate = null;
  let endDate = null;

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

  let dispatchStart = '';
  let dispatchEnd = '';

  // Footer content based on selected date range
  let footer = <p>New Dates:</p>;
  if (range.from) {
    if (!range.to) {
      footer = <p>{range.from.toLocaleDateString()}</p>;
    } else if (range.to) {
      //format range to DateTime
      dispatchStart = DateTime.fromJSDate(range.from);
      dispatchEnd = DateTime.fromJSDate(range.to);

      //format for dispatch
      startDate = dispatchStart.toISO(); // Convert to ISO 8601 string
      endDate = dispatchEnd.toISO(); // Convert to ISO 8601 string

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
      trip_location: resultName,
      trip_latitude: longitude,
      trip_longitude: latitude,
      timezone: timezone,
      trip_start: startDate,
      trip_end: endDate,
    };

    console.log('Editing trip:', tripData);
    dispatch({ type: 'EDIT_TRIP', payload: tripData });
    history.push(`/mytrips/${user}`);
  }

  //format shown dates
  function formatDate(dateInput) {
    const dateTime = DateTime.fromISO(dateInput, { zone: 'utc' });
    return dateTime.toFormat('MM/dd/yyyy');
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="center" width="600px" p={2}>
              <TextField
                id="outlined-basic"
                label={trip.trip_location}
                variant="outlined"
                type="text"
                onChange={handleInputChange}
                color="secondary"
                onKeyPress={handleEnter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearch}
                        aria-label="search"
                        edge="end"
                      >
                        {' '}
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {searchSuccess && (
              <Box p={2}>
                <p>New location: {resultName}</p>
              </Box>
            )}
          </Grid>

          <Grid item xs={6}>
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
                <div>{footer}</div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="center">
        <Button onClick={submitEdit} variant="outlined">
          Submit Changes
        </Button>
      </div>
    </div>
  );
}

export default EditTrip;
