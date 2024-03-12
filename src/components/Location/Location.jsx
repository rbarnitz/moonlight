import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Location.css';

//MUI dependencies
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Location = () => {
  //set town reducer for API & search
  const [townName, setTownName] = useState('');

  //setting search changes
  const handleInputChange = (event) => {
    setTownName(event.target.value);
  };

  const handleSearch = async () => {
    console.log('search clicked', townName);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Enter Location"
      variant="outlined"
      type="text"
      value={townName}
      onChange={handleInputChange}
      color="success"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch} aria-label="search" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Location;
