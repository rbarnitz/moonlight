import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SetDates.css';

import Button from '@mui/material/Button';

const SetDates = () => {
  //linking to MoonData page
  let history = useHistory();

  //navigate to Calendar
  function handleNext() {
    history.push('/mytrips');
  }

  return (
    <div>
      <h1>Set Dates</h1>
      <Button onClick={handleNext} variant="outlined">
        Next
      </Button>
    </div>
  );
};

export default SetDates;
