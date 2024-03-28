import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTrips(action) {
  try {
    const response = yield axios.get(`/api/mytrips/${action.payload}`);
    yield put({ type: 'SET_TRIPS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* createTrip(action) {
  try {
    const response = yield axios.post(`/api/setdates`, action.payload);
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* deleteTrip(action) {
  try {
    const tripId = encodeURIComponent(action.payload);
    console.log(tripId);

    const response = yield axios.delete(`/api/edittrip/${tripId}`);
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* viewTrip(action) {
  try {
    const response = yield axios.get(`/api/edittrip/${action.payload}`);
    yield put({ type: 'SET_TRIP_TO_EDIT', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editTrip(action) {
  try {
    yield axios.put(
      `/api/edittrip/${action.payload.tripId}`,
      action.payload.tripData
    );
    // You can dispatch another action here after the edit is successful if needed
  } catch (error) {
    console.log('User put request failed', error);
  }
}

function* tripSaga() {
  yield takeLatest('FETCH_TRIPS', fetchTrips);
  yield takeLatest('CREATE_TRIP', createTrip);
  yield takeLatest('DELETE_TRIP', deleteTrip);
  yield takeLatest('VIEW_TRIP', viewTrip);
  yield takeLatest('EDIT_TRIP', editTrip);
}

export default tripSaga;
