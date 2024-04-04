import React from 'react';
import Box from '@mui/material/Box';

function AboutPage() {
  return (
    <div className="container">
      <Box width="500px" p={2}>
        <div>
          <h5>
            Moonlight is a tool to help you find when the moon will be out, and
            how bright it will be! Simply search a location, then explore dates
            you're interested in.
          </h5>
          <h5>
            Once you've found your ideal conditions, save your trip to view
            later!
          </h5>
          <br></br>
          <h5> Moonlight will display: </h5>
          <h5>Moon rise times</h5>
          <h5> moon set times</h5>
          <h5> moon illumination</h5>
        </div>
      </Box>
    </div>
  );
}

export default AboutPage;
