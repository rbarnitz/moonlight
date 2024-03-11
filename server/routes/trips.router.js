const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//Not currently working

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const userID = req.user.id;
  console.log('fetching trips for: ', userID);

  const query = `SELECT * FROM 
  "trips" WHERE "trips".user_id = 7;`;

  pool
    .query(query)
    .then((result) => {
      //return all trips matching this ID
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get trip details', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
