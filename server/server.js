const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const tripsRouter = require('./routes/trips.router');
const setDatesRouter = require('./routes/dates.router');
const editRouter = require('./routes/edit.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
//register new routes here:
app.use('/api/user', userRouter);
app.use('/api/mytrips', tripsRouter);
app.use('/api/setdates', setDatesRouter);
app.use('/api/edittrip', editRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
