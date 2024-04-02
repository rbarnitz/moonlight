import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SunCalc from 'suncalc';
import { DateTime } from 'luxon';
import MoonIcon from '../MoonIcon/MoonIcon';

function SunCalcs({ latitude, longitude, timezone, startDate }) {
  console.log(
    'suncalc inputs',
    latitude,
    longitude,
    timezone,
    'date',
    startDate
  );

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

    //pull data for the next day
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

  // const prettyDate = startDate.toISO();
  // console.log('prettydate: ', prettyDate);
  // const cutPrettyDate = prettyDate.slice(0, 5);
  // console.log('cut prettydate: ', cutPrettyDate);

  //format date to send to display
  const prettyDate = startDate
    ? DateTime.fromJSDate(startDate).toFormat('EEE LLL dd yyyy')
    : '';

  console.log(prettyDate);

  function formatDateTime(dateTimeInput) {
    const dateTime = DateTime.fromISO(dateTimeInput);
    return dateTime.toFormat('MMMM d, yyyy hh:mm');
  }

  // function formatDateTime(dateTimeInput) {
  //   console.log(dateTimeInput);
  //   return dateTimeInput;
  // }

  return (
    <>
      <p>{prettyDate}</p>
      <MoonIcon phase={phase} />
      <p>Illumination: {percentage}%</p>
      <div>
        {moonriseTime && !moonsetTime ? (
          <div>
            <p>Local rise is: {formatDateTime(moonriseTime)}</p>
            <p>Next Day Set is: {formatDateTime(moonsetAlternate)}</p>
          </div>
        ) : moonsetTime && !moonriseTime ? (
          <div>
            <p>Local Set is: {formatDateTime(moonsetTime)}</p>
            <p>There is no moonrise today</p>
          </div>
        ) : moonriseTime < moonsetTime ? (
          <div>
            <p>Local rise is: {formatDateTime(moonriseTime)}</p>
            <p>Local Set is: {formatDateTime(moonsetTime)}</p>
          </div>
        ) : (
          <div>
            <p>Local rise is: {formatDateTime(moonriseTime)}</p>
            <p>Next Day Set is: {formatDateTime(moonsetAlternate)}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SunCalcs;
