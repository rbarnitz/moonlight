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

function* tripSaga() {
  yield takeLatest('FETCH_TRIPS', fetchTrips);
  yield takeLatest('CREATE_TRIP', createTrip);
}

export default tripSaga;
