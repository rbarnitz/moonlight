import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './MoonData.css';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { DayPicker } from 'react-day-picker';
import Button from '@mui/material/Button';

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
  console.log('selected day is: ', selectedDay);

  //display selected date in footer
  const footer = selectedDay ? (
    <p>You selected {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );

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
