const express = require('express');
const pool = require('../modules/pool');
const {
  default: tripsReducer,
} = require('../../src/redux/reducers/trips.reducer');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const userID = req.params.id;
});
console.log('fetching trips for: ', userID);

const query = `
  SELECT
  trips.trip_location AS trip_location,
  trips.trip_latitude AS latitude,
  trips.trip_longitude AS longitude,
  trips.trip_start AS start_date,
  trips.trip_end AS end_date
FROM
  "trips"
JOIN
  "user" ON "trips".user_id = "user".id
WHERE
  "user".id = 1;
  `;
pool
  .query(query, [userID])
  .then((result) => {
    console.log('User Trips: ', result.rows);
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('ERROR: Get trip details', err);
    res.sendStatus(500);
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
