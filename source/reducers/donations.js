import {
  RECEIVED_DONATIONS,
  RECEIVED_MY_DONATIONS
}                         from 'constants';
import { auth }           from 'utilities/auth';

// let initialState = auth.all() || {};
let initialState = {
  donations: [{
    id: 1,
    name: 'Cosmos Fulanito',
    blood_type: 'A-',
    size: 5,
    description: 'Wololo esto es una descripcion super chevere.'
  }, {
    id: 2,
    name: 'Cosmos Fulanito',
    blood_type: 'A-',
    size: 5,
    description: 'Wololo esto es una descripcion super chevere.'
  }, {
    id: 3,
    name: 'Cosmos Fulanito',
    blood_type: 'A-',
    size: 5,
    description: 'Wololo esto es una descripcion super chevere.'
  }],
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
