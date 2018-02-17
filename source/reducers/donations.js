import {
  RECEIVED_DONATIONS,
  RECEIVED_MY_DONATIONS,
  DELETED_DONATION
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
    case DELETED_DONATION:
      let value = action.id

      let arr

      arr = arr.filter(function(item) { 
          return item.id !== value
      })

      return {
        ...state,
        donations: action.data
      }
    default:
      return state;
  }
}
