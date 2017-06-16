import {
  call,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';

import {
  findLocation
} from '../utils/location';

import {
  GET_USER_LOCATION,
  setUserLocation,
} from '../actions/userActions';

function* getLocation({
  payload
}) {
  try {
    const position = yield call(findLocation);
    yield put(setUserLocation(position));
  } catch (error) {}
}

function* userSaga() {
  yield takeLatest(GET_USER_LOCATION, getLocation);
}

export default [fork(userSaga)];