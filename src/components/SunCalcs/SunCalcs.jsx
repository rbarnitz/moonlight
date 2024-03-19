import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import MoonIcon from '../MoonIcon/MoonIcon';

// // Basic functional component structure for React with default state
// // value setup. When making a new component be sure to replace the
// // component name TemplateFunction with the name for the new component.
function SunCalcs({ latitude, longitude, timezone, startDate }) {
  //   // Using hooks we're creating local state for a "heading" variable with
  //   // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Sun Calcs');
  const [moonriseTime, setMoonriseTime] = useState(null);
  const [moonsetTime, setMoonsetTime] = useState(null);
  const [moonsetAlternate, setMoonsetAlternate] = useState(null);

  //pull data from suncalcs, illumination and phase percentage
  const illumination = SunCalc.getMoonIllumination(startDate).fraction;
  const phase = SunCalc.getMoonIllumination(startDate).phase;

  //convert to percentage
  const percentage = (illumination * 100).toFixed(0);
  console.log('illumination is:', illumination);

  useEffect(() => {
    const moonTimes = SunCalc.getMoonTimes(
      startDate,
      latitude,
      longitude,
      true
    );

    //pull data for the net day
    const luxonNextDay = DateTime.fromJSDate(startDate);
    const nextDay = luxonNextDay.plus({ days: 1 });
    const nextDayFormat = nextDay.toJSDate();

    //next day moonset case:
    const moonTimesAlt = SunCalc.getMoonTimes(
      nextDayFormat,
      latitude,
      longitude,
      true
    );

    //set to UTC
    const moonriseUTC = moonTimes.rise
      ? moonTimes.rise.toISOString()
      : 'No data';
    const moonsetUTC = moonTimes.set ? moonTimes.set.toISOString() : 'No data';
    const moonsetAltUTC = moonTimesAlt.set
      ? moonTimesAlt.set.toISOString()
      : 'No data';

    //luxon to local time
    const moonriseLocal = DateTime.fromISO(moonriseUTC, { zone: timezone });
    const moonsetLocal = DateTime.fromISO(moonsetUTC, { zone: timezone });
    const moonsetAltLocal = DateTime.fromISO(moonsetAltUTC, { zone: timezone });

    setMoonriseTime(moonriseLocal.toISO());
    setMoonsetTime(moonsetLocal.toISO());
    setMoonsetAlternate(moonsetAltLocal.toISO());
  }, [startDate, latitude, longitude, timezone]);

  // <p>Rise is: {moonTimes}</p>
  // <p>Set is: {moonTimes.}</p>
  return (
    <>
      <MoonIcon phase={phase} />
      <p>{percentage}%</p>
      <div>
        {moonriseTime && !moonsetTime ? (
          <div>
            <p>Local rise is: {moonriseTime}</p>
            <p>Next Day Set is: {moonsetAlternate}</p>
          </div>
        ) : moonsetTime && !moonriseTime ? (
          <div>
            <p>Local Set is: {moonsetTime}</p>
            <p>There is no moonrise today</p>
          </div>
        ) : moonriseTime < moonsetTime ? (
          <div>
            <p>Local rise is: {moonriseTime}</p>
            <p>Local Set is: {moonsetTime}</p>
          </div>
        ) : (
          <div>
            <p>Local rise is: {moonriseTime}</p>
            <p>Next Day Set is: {moonsetAlternate}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SunCalcs;
