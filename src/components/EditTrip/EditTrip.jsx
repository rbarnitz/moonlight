import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

import {
  Stack,
  Button,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function EditTrip() {
  //set range state
  const [range, setRange] = useState();

  return (
    <>
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

      <DayPicker
        mode="range"
        min={2}
        max={6}
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
    </>
  );
}

export default EditTrip;
