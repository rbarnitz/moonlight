import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Card,
  Button,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import SunCalcs from '../SunCalcs/SunCalcs';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Interval, DateTime } from 'luxon';
import './ViewTrip.css';

function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [dateList, setDateList] = useState([]);
  let history = useHistory();

  const user = useSelector((store) => store.user.id);

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
  console.log('trip data ', trip);

  function myTrips(id) {
    history.push(`/mytrips/${user}`);
  }

  function editTrip() {
    history.push(`/editTrip/${id}`);
  }

  //allow date objects to be formatted as they are mapped
  function formatDate(dateInput) {
    const dateTime = DateTime.fromISO(dateInput, { zone: 'utc' });
    return dateTime.toFormat('MMMM d, yyyy');
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ position: 'sticky', top: '20px' }}>
          <div className="centered">
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
              }}
            >
              <h2>Trip Details:</h2>
              <p> {trip.trip_location}</p>
              <p>
                {' '}
                {formatDate(trip.trip_start)} - {formatDate(trip.trip_end)}
              </p>
            </Box>
            <Box>
              <Button onClick={myTrips} variant="outlined">
                Back
              </Button>{' '}
              <Button onClick={editTrip} variant="outlined">
                Edit
              </Button>
            </Box>
          </div>
        </Grid>

        <Grid item xs={6}>
          <section
            style={{
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 40px)', // Adjust height as needed
            }}
            className="datecards"
          >
            {dateList.map((date, index) => (
              <Box
                key={index}
                width="500px"
                height="300px"
                className="card"
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  marginBottom: '10px',
                }}
              >
                <CardContent className="cardcontent">
                  <SunCalcs
                    latitude={trip.trip_latitude}
                    longitude={trip.trip_longitude}
                    timezone={trip.timezone}
                    startDate={new Date(date)}
                  />
                </CardContent>
              </Box>
            ))}
          </section>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewTrip;
