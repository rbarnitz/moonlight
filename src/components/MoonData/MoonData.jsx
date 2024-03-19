import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './MoonData.css';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { DayPicker } from 'react-day-picker';
import Button from '@mui/material/Button';
//date dependencies
import { DateTime } from 'luxon';

const MoonData = () => {
  const user = useSelector((store) => store.user.id);
  console.log(user);

  //linking to MoonData page
  let history = useHistory();

  //reducer for selected day to return SunCalcs
  const [selectedDay, setSelectedDay] = useState();

  //navigate to Calendar
  function handleNext() {
    history.push(`/setdates/${user}`);
  }

  //format date for display using Luxon
  const dateData = selectedDay ? DateTime.fromJSDate(selectedDay).toISO() : '';
  console.log('selected day is: ', dateData);

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
    <div>
      <h1>Moon Data</h1>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        footer={footer}
      />
      <Button onClick={handleNext} variant="outlined">
        Next
      </Button>
    </div>
  );
};

export default MoonData;
