import update from 'immutability-helper';

import {
  SET_USER_LOCATION
} from '../actions/userActions';

const INITIAL_STATE = {
  location: {
    latitude: '48.8566',
    longitude: '2.3522',
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_LOCATION:
      return update(state, {
        location: {
          $set: action.payload.coords,
        },
      });

    default:
      return state;
  }
}