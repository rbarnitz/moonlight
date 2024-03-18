import React from 'react';
import Box from '@mui/material/Box';

function AboutPage() {
  return (
    <div className="container">
      <Box width="400px" p={2}>
        <div>
          <p>
            Moonlight is a tool to help you find when the moon will be out, and
            how bright it will be! Simply search a location, then explore dates
            you're interested in.
          </p>
          <br></br>
          <p> Moonlight will display: </p>
          <p>Moon rise times</p>
          <p> moon set times</p>
          <p> moon illumination</p>
        </div>
      </Box>
    </div>
  );
}

export default AboutPage;
