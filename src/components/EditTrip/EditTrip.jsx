import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function EditTrip() {
  // Set variables
  const { id } = useParams(); // Use 'id' here

  // Setting new input information
  const [range, setRange] = useState();
  const [location, setLocation] = useState();

  // useEffect(() => {
  //   axios.get(`/api/edittrip/${id}`);

  // }, []);

  console.log('Trip ID is: ', id);

  return (
    <>
      <p>ID is: {id}</p>
      <div className="container">
        <Stack>
          <Box width="400px" p={2}>
            <TextField
              id="outlined-basic"
              label="Enter Location"
              variant="outlined"
              type="text"
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="search" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
      </div>

      {/* DayPicker Component */}
    </>
  );
}

export default EditTrip;
