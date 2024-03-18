const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/:id', rejectUnauthenticated, (req, res) => {
//   //pull user ID to fetch trip data
//   // const userID = req.user.id;
//   // console.log('current user ID:', userID);
//   const query = `SELECT * FROM
//   "trips" WHERE "trips".user_id = $1;`;

//   pool
//     .query(query, [req.params.id])
//     .then((result) => {
//       //return all trips matching this ID
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('ERROR: Get trip details', err);
//       res.sendStatus(500);
//     });
// });

/**
 * POST route template
 * //get info from store, to req
 */

router.put(':id', (req, res) => {
  const dbEditQuery = `UPDATE "trips" SET 
  "trip_location" = $1, 
  "trip_longitude" =$2 ,
  "trip_latitude" =$3, 
  "timezone" = $4, 
  "trip_start" = $5, 
  "trip_end" = $6
  WHERE "trip_id" = $7 AND "user_id" = $8;`;

  pool
    .query(dbTripQuery, [
      req.body.trip_location,
      req.body.trip_latitude,
      req.body.trip_longitude,
      req.body.timezone,
      req.body.trip_start,
      req.body.trip_end,
      req.params.id,
      req.body.user_id,
    ])
    .then((result) => {
      //Now that both are done, send back success!
      res.sendStatus(201);
    })
    .catch((err) => {
      // catch for second query
      console.log('ERROR: Editing trip ', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  //console.log(req.body);
  // RETURNING "id" will give us back the id of the created trip
  const dbTripQuery = `
    INSERT INTO "trips" 
      ("user_id", "trip_location", "trip_longitude", "trip_latitude", "timezone" ,"trip_start", "trip_end")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "trip_id";`;

  const insertTripValues = [
    req.body.user_id,
    req.body.trip_location,
    req.body.trip_latitude,
    req.body.trip_longitude,
    req.body.timezone,
    req.body.trip_start,
    req.body.trip_end,
  ];
  pool
    .query(dbTripQuery, [
      req.body.user_id,
      req.body.trip_location,
      req.body.trip_latitude,
      req.body.trip_longitude,
      req.body.timezone,
      req.body.trip_start,
      req.body.trip_end,
    ])
    .then((result) => {
      //Now that both are done, send back success!
      res.sendStatus(201);
    })
    .catch((err) => {
      // catch for second query
      console.log('ERROR: Posting trip ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
