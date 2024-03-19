import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SunCalc from 'suncalc';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function SunCalcs({ latitude, longitude, startDate }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Sun Calcs');

  //pull data form suncalcs:
  const illumination = SunCalc.getMoonIllumination(startDate);
  const moonTimes = SunCalc.getMoonTimes(startDate, latitude, longitude, true);
  console.log('illumination is:', startDate, illumination);
  const moonRiseUTC = moonTimes.rise ? moonTimes.rise.toISOString() : 'No data';
  const moonSetUTC = moonTimes.set ? moonTimes.set.toISOString() : 'No data';

  // <p>Rise is: {moonTimes}</p>
  // <p>Set is: {moonTimes.}</p>

  return (
    <div>
      <p>{moonRiseUTC}</p>
      <p>{moonSetUTC}</p>
      <p>{illumination.fraction}</p>
    </div>
  );
}

export default SunCalcs;
