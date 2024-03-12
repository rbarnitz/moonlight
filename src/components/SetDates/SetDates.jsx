import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SetDates.css';
import { format } from 'date-fns';

import Button from '@mui/material/Button';
//import DateRange from 'react-day-picker/es/DateRange';
import { DayPicker } from 'react-day-picker';

const SetDates = () => {
  //linking to MoonData page
  let history = useHistory();

  const user = useSelector((store) => store.user.id);
  console.log(user);

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
      console.log('date range is:', footer.props.children);
      // const dateStart = footer.props.children.props.children;
      // console.log('start is: ', dateStart);      const dateEnd = footer.props.children[1];

      const startDate = footer.props.children[1].props.children[0];
      const endDate = footer.props.children[1].props.children[2];

      console.log('start & end are: ', startDate, endDate);
    }
  }

  //navigate to Calendar
  function handleNext() {
    history.push(`/mytrips/${user}`);
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
        Save Dates
      </Button>
    </div>
  );
};

export default SetDates;
