import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Interval, DateTime } from 'luxon';

function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [dateList, setDateList] = useState([]);

  function dateRange(start, end) {
    start = DateTime.fromISO(start);
    end = DateTime.fromISO(end);

    const intervals = Interval.fromDateTimes(
      start.startOf('day'),
      end.endOf('day')
    )
      .splitBy({ day: 1 })
      .map((d) => d.start);

    console.log('interval is  ', intervals);

    return intervals;
  }

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/viewtrip/${id}`);
        setTrip(response.data[0]);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (trip) {
      const dates = dateRange(trip.trip_start, trip.trip_end);
      setDateList(dates);
    }
  }, [trip]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  console.log('dateList:', dateList);

  return (
    <div>
      <h1>View Trip Details</h1>
      <p>Location: {trip.trip_location}</p>
      <p>Start: {trip.trip_start}</p>
      <p>End: {trip.trip_end}</p>

      <h2>Dates Within the Trip Range:</h2>
      <ul>
        {dateList.map((date, index) => (
          <li key={index}>{date.toISODate()}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTrip;
