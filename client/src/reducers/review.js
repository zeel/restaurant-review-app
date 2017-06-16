import update from 'immutability-helper';

import {
  REVIEW_FETCHED_REQUESTED,
  REVIEW_FETCHED_SUCCEEDED,
  REVIEW_CREATE_REQUESTED,
  REVIEW_CREATE_SUCCEEDED,
} from '../actions/reviewActions';

const INITIAL_STATE = {
  reviews: [],
  isLoading: true,
};

export default function(state = INITIAL_STATE, action) {
  const {
    payload
  } = action;
  switch (action.type) {
    case REVIEW_FETCHED_REQUESTED:
    case REVIEW_CREATE_REQUESTED:
      return update(state, {
        isLoading: {
          $set: true,
        },
      });

    case REVIEW_FETCHED_SUCCEEDED:
      return update(state, {
        isLoading: {
          $set: false,
        },
        reviews: {
          $set: payload.reviews,
        }
      });

    case REVIEW_CREATE_SUCCEEDED:
      return update(state, {
        isLoading: {
          $set: false,
        },
        reviews: {
          $push: [payload.review],
        }
      });

    default:
      return state;
  }
}