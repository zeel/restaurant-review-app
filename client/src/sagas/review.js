import {
  call,
  put,
  fork,
  takeLatest
} from 'redux-saga/effects';

import {
  REVIEW_FETCHED_REQUESTED,
  REVIEW_CREATE_REQUESTED,
  fetchedReviews,
  createdReview,
} from '../actions/reviewActions';

import reviewService from '../services/reviewService';

function* fetchReviewsWorker({
  payload
}) {
  try {
    const reviews = yield call(reviewService.get, payload.placeId);
    yield put(fetchedReviews(reviews));
  } catch (error) {

  }
}

function* createReviewsWorker({
  payload
}) {
  try {
    const review = yield call(reviewService.create, payload.review);
    yield put(createdReview(review));
  } catch (error) {}
}

function* reviewSaga() {
  yield takeLatest(REVIEW_FETCHED_REQUESTED, fetchReviewsWorker);
  yield takeLatest(REVIEW_CREATE_REQUESTED, createReviewsWorker);
}

export default [fork(reviewSaga)];