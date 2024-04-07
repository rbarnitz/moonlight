import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SetDates.css';
import { format } from 'date-fns';
import { DateTime, Interval } from 'luxon';

import './SetDates.css';

import Button from '@mui/material/Button';
//import DateRange from 'react-day-picker/es/DateRange';
import { DayPicker } from 'react-day-picker';

const SetDates = () => {
  //linking to MoonData page
  let history = useHistory();
  let dispatch = useDispatch();

  //declare date variables:
  let startDate = null;
  let endDate = null;

  // pulling state info for testing
  const user = useSelector((store) => store.user.id);
  const locationInfo = useSelector((store) => store.locationReducer);
  //console.log('location info from state:', locationInfo);
  const locationName = locationInfo.searchedLocation;
  //console.log(user);

  //initial template for trip dispatch

  //set range state
  const [range, setRange] = useState();

  //declare dispatch dates
  let dispatchStart = '';
  let dispatchEnd = '';

  let footer = <p>Pick a date!</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      dispatchStart = DateTime.fromJSDate(range.from);
      dispatchEnd = DateTime.fromJSDate(range.to);
      console.log('JS Date: ', dispatchStart);

      dispatchStart.toISO(); // Convert to ISO 8601 string
      endDate = dispatchEnd.toISO(); // Convert to ISO 8601 string
      console.log('ISO Date: ', startDate);

      footer = (
        <>
          <p>Selected dates:</p>
          <p>
            {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
          </p>
        </>
      );
    }
  }

  //navigate to Calendar
  function handleNext() {
    dispatch({
      type: 'CREATE_TRIP',
      payload: {
        user_id: user,
        trip_location: locationInfo.searchedLocation,
        trip_latitude: locationInfo.latitude,
        trip_longitude: locationInfo.longitude,
        timezone: locationInfo.timezone,
        trip_start: startDate,
        trip_end: endDate,
      },
    });
    history.push(`/mytrips/${user}`);
  }

  function formatDate(dateInput) {
    const dateTime = DateTime.fromISO(dateInput, { zone: 'utc' });
    return dateTime.toFormat('MMMM d, yyyy');
  }

  return (
    <div className="container">
      <h1>Set Dates</h1>

      <br></br>
      <DayPicker
        mode="range"
        min={2}
        max={6}
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />

      <p>Start Date is: {formatDate(startDate)}</p>
      <p>End Date is: {formatDate(endDate)}</p>
      <p>Location is: {locationName}</p>

      <Button onClick={handleNext} variant="outlined">
        Save Dates
      </Button>
    </div>
  );
};

export default SetDates;
