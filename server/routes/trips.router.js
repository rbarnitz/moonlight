const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//Not currently working

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  //pull user ID to fetch trip data
  // const userID = req.user.id;
  // console.log('current user ID:', userID);
  // const query = `SELECT * FROM
  // "trips" WHERE "trips".user_id = $1;`;

  const query = `
  SELECT * FROM 
  "trips" WHERE "trips".user_id = $1
  ORDER BY  "trips".trip_start;`;

  pool
    .query(query, [req.params.id])
    .then((result) => {
      //return all trips matching this ID
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get trip details', err);
      res.sendStatus(500);
    });
});

module.exports = router;
