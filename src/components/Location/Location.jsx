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
  let lat = 0;
  let lng = 0;
  let searchedLocation = '';
  let timezone = '';

  //set town reducer for API & search
  const [townName, setTownName] = useState('');
  const [locationInfo, setLocationInfo] = useState('');

  // dispatch for location returned API information
  const dispatch = useDispatch();

  //setting blank values for API info:
  const [coordinates, setCoordinates] = useState(null);

  //search result: geotagged name
  const [resultName, setResultName] = useState('');

  //linking to MoonData page
  const history = useHistory();

  //setting search changes
  const handleInputChange = (event) => {
    setTownName(event.target.value);
  };

  //set up asynch function for API testing
  const handleSearch = async () => {
    console.log('search for: ', townName);

    //API call
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          townName
        )}&key=c5bf905a37154ab79398510f969d8f54`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch API result');
      }

      const APIResponse = await response.json();

      //declare result name:
      searchedLocation = APIResponse.results[0].formatted;

      //declaring latitude & longitude data:
      lat = APIResponse.results[0].geometry.lat;
      lng = APIResponse.results[0].geometry.lng;

      //declaring timezone data:
      //Other provided data:

      // name: "Europe/Berlin"
      // now_in_dst: 0
      // offset_sec:3600
      //offset_string:"+0100"
      //short_name:"CET"
      timezone = APIResponse.results[0].annotations.timezone.offset_string;

      dispatch({
        type: 'ADD_LOCATION_INFO',
        payload: {
          lat: lat,
          lng: lng,
          searchedLocation: searchedLocation,
          timezone: timezone,
        },
      });
    } catch (error) {
      console.error(error.message);
      setCoordinates(null);
    }
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
