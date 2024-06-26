const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

router.put('/:id', (req, res) => {
  const dbEditQuery = `UPDATE "trips" SET 
  "trip_location" = $1, 
  "trip_longitude" =$2 ,
  "trip_latitude" =$3, 
  "timezone" = $4, 
  "trip_start" = $5, 
  "trip_end" = $6
  WHERE "trip_id" = $7 AND "user_id" = $8;`;

  pool
    .query(dbEditQuery, [
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
      //Now that both are done, send back success
      res.sendStatus(201);
    })
    .catch((err) => {
      // catch for second query
      console.log('ERROR: Posting trip ', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('Deleting trip with ID:', req.params.id);
  console.log(req.params);

  const deleteQuery = `DELETE FROM "trips" WHERE "trip_id" = $1;`;

  pool
    .query(deleteQuery, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('ERROR: Delete trip', err);
      res.sendStatus(500);
    });
});

module.exports = router;
