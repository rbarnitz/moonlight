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
  let lat = 123;
  let lng = 456;
  let searchedLocation = 'from Location file';
  let timezone = 'Location timezone';

  //set town reducer for API & search
  const [townName, setTownName] = useState('');
  const [locationInfo, setLocationInfo] = useState('');

  // dispatch for location returned API information
  const dispatch = useDispatch();

  //setting blank values for API info:
  const [coordinates, setCoordinates] = useState(null);

  //search result: geotagged name
  const [resultName, setResultName] = useState('');

  //set test object for dispatch & saga testing
  const testReturn = {
    lat: '33.333',
    lng: '44.444',
    searchedLocation: 'Disneyland',
    timezone: 'Moon Time',
  };

  //linking to MoonData page
  const history = useHistory();

  //setting search changes
  const handleInputChange = (event) => {
    setTownName(event.target.value);
  };

  //set up asynch function for API testing
  const handleSearch = async () => {
    console.log('search clicked', townName);
    console.log('will dispatch this info later: ', testReturn);
    setTownName(testReturn);
    setLocationInfo(testReturn);

    dispatch({
      type: 'ADD_LOCATION_INFO',
      payload: {
        lat: lat,
        lng: lng,
        searchedLocation: searchedLocation,
        timezone: timezone,
      },
    });
  };

  //navigate to Calendar
  function handleNext() {
    history.push('/moondata');
  }

  return (
    <div className="search">
      <Stack>
        <Box width="400px" p={2}>
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
                  <IconButton
                    onClick={handleSearch}
                    aria-label="search"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box p={2}>
          <Button onClick={handleNext} variant="outlined">
            Next
          </Button>
        </Box>
      </Stack>
    </div>
  );
};

export default Location;
