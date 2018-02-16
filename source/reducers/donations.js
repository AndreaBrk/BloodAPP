import {
  RECEIVED_DONATIONS,
  RECEIVED_MY_DONATIONS
}                         from 'constants';
import { auth }           from 'utilities/auth';

// let initialState = auth.all() || {};
let initialState = {
  donations: [],
  my_donations: []
};
export default function donationsReducer (state = initialState, action) {

  switch (action.type) {
    case RECEIVED_DONATIONS:
      return {
        ...state,
        donations: action.data
      }
    case RECEIVED_MY_DONATIONS:
      return {
        ...state,
        my_donations: action.data
      }
    default:
      return state;
  }
}
