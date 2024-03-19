import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './MoonData.css';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import MoonIcon from '../MoonIcon/MoonIcon';
import SunCalcs from '../SunCalcs/SunCalcs';

import { DayPicker } from 'react-day-picker';
import Button from '@mui/material/Button';
//date dependencies
import { DateTime } from 'luxon';

import SunCalc from 'suncalc';

const MoonData = () => {
  const user = useSelector((store) => store.user.id);
  console.log(user);

  const locationInfo = useSelector((store) => store.locationReducer);

  console.log('location info from state:', locationInfo);
  const locationName = locationInfo.searchedLocation;
  const latitude = locationInfo.latitude;
  const longitude = locationInfo.longitude;

  //linking to MoonData page
  let history = useHistory();

  //reducer for selected day to return SunCalcs
  const [selectedDay, setSelectedDay] = useState();

  //navigate to Calendar
  function handleNext() {
    history.push(`/setdates/${user}`);
  }

  //format date to send to SunCalcs
  const dateData = selectedDay
    ? DateTime.fromJSDate(selectedDay).toISODate()
    : '';
  console.log('selected day is: ', dateData);

  //format date to send to display
  const prettyDate = selectedDay
    ? DateTime.fromJSDate(selectedDay).toFormat('EEE LLL dd yyyy')
    : '';

  //display selected date in footer
  const footer = prettyDate ? (
    <p>You selected: {prettyDate}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  console.log('selected day unformatted', selectedDay);

  return (
    <>
      <div>
        <h1>Moon Data</h1>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          footer={footer}
        />
        <p>Moon Data for {locationName}</p>
        <Button onClick={handleNext} variant="outlined">
          Next
        </Button>
      </div>
      <div>
        <SunCalcs
          latitude={latitude}
          longitude={longitude}
          startDate={selectedDay}
        />
        <MoonIcon />
      </div>
    </>
  );
};

export default MoonData;
