import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewTrip() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

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

  if (!trip) {
    return <div>Loading...</div>;
  }

  console.log(trip);

  return (
    <div>
      <h1>View Trip Details</h1>
      <p>Location: {trip.trip_location}</p>
      <p>Start: {trip.trip_start}</p>
      <p>End: {trip.trip_end}</p>
    </div>
  );
}

export default ViewTrip;
