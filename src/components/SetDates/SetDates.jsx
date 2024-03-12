import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SetDates.css';

import Button from '@mui/material/Button';
//import DateRange from 'react-day-picker/es/DateRange';
import DayPicker from 'react-day-picker';

const SetDates = () => {
  //linking to MoonData page
  let history = useHistory();

  //set range state
  const [range, setRange] = useState();

  let footer = <p>Pick a date!</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <>
          <p>Selected dates:</p>
          <p>
            {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
          </p>
        </>
      );
      console.log('date range is:', footer);
    }
  }
  //navigate to Calendar
  function handleNext() {
    history.push('/mytrips');
  }

  return (
    <div>
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

      <Button onClick={handleNext} variant="outlined">
        Next
      </Button>
    </div>
  );
};

export default SetDates;
