import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper, Stack, Box, Button } from '@mui/material';

import store from '../../redux/store';

function UserPage() {
  const history = useHistory();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  console.log('from user: ', user);

  function myTrips() {
    history.push(`/mytrips/${user.id}`);
  }

  function newTrip() {
    history.push(`/location`);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Box sx={{ width: 400 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent={'center'}
        >
          {' '}
          <Button
            variant="outlined"
            style={{
              width: 200, // Set the width
              height: 180, // Set the height
            }}
            onClick={myTrips}
          >
            My Trips
          </Button>
          <Button
            variant="outlined"
            style={{
              width: 200, // Set the width
              height: 180, // Set the height
            }}
          >
            New Trip
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
