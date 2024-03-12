import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './MoonData.css';

import Button from '@mui/material/Button';

const MoonData = () => {
  //linking to MoonData page
  let history = useHistory();

  //navigate to Calendar
  function handleNext() {
    history.push('/setdates');
  }

  return (
    <div>
      <h1>Moon Data</h1>
      <Button onClick={handleNext} variant="outlined">
        Next
      </Button>
    </div>
  );
};

export default MoonData;
