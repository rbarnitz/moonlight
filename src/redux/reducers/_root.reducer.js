import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import tripsReducer from './trips.reducer';
import locationReducer from './location.reducer';
import createTripReducer from './dates.reducer';
import editReducer from './edit.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  tripsReducer, //will contain any trips that match user ID
  locationReducer, //will contain searched location info
  createTripReducer, //contains date range and location info from setdates
  editReducer,
});

export default rootReducer;
