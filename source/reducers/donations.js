import {
  RECEIVED_DONATIONS
} from 'constants';
import { auth }           from 'utilities/auth';

// let initialState = auth.all() || {};
let initialState = {
  dashboard: [],
};
export default function donationsReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVED_DONATIONS:
      return {
        ...state,
        dashboard: action.data
      }
    default:
      return state;
  }
}
