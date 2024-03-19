import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SunCalc from 'suncalc';
import { DateTime } from 'luxon';

// // Basic functional component structure for React with default state
// // value setup. When making a new component be sure to replace the
// // component name TemplateFunction with the name for the new component.
function SunCalcs({ latitude, longitude, timezone, startDate }) {
  //   // Using hooks we're creating local state for a "heading" variable with
  //   // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Sun Calcs');
  const [moonRiseTime, setMoonRiseTime] = useState(null);
  const [moonSetTime, setMoonSetTime] = useState(null);

  //pull data form suncalcs:
  const illumination = SunCalc.getMoonIllumination(startDate);
  // const moonTimes = SunCalc.getMoonTimes(startDate, latitude, longitude, true);
  // console.log('illumination is:', startDate, illumination);

  // const moonRiseUTC = moonTimes.rise ? moonTimes.rise.toISOString() : 'No data';
  // const moonSetUTC = moonTimes.set ? moonTimes.set.toISOString() : 'No data';

  // const moonrise = DateTime.fromISO(moonRiseUTC, { zone: timezone });
  // console.log('moonrise Luxon is:', moonrise.toISO());

  useEffect(() => {
    const moonTimes = SunCalc.getMoonTimes(
      startDate,
      latitude,
      longitude,
      true
    );

    //set to UTC
    const moonRiseUTC = moonTimes.rise
      ? moonTimes.rise.toISOString()
      : 'No data';

    const moonSetUTC = moonTimes.set ? moonTimes.set.toISOString() : 'No data';

    //luxon to local time
    const moonRiseLocal = DateTime.fromISO(moonRiseUTC, { zone: timezone });
    const moonSetLocal = DateTime.fromISO(moonSetUTC, { zone: timezone });

    setMoonRiseTime(moonRiseLocal.toISO());
    setMoonSetTime(moonSetLocal.toISO());
  }, [startDate, latitude, longitude, timezone]);

  // <p>Rise is: {moonTimes}</p>
  // <p>Set is: {moonTimes.}</p>

  return (
    <div>
      <p>Local rise is: {moonRiseTime}</p>
      <p>Local Set is: {moonSetTime}</p>

      <p>{illumination.fraction}</p>
    </div>
  );
}

export default SunCalcs;
