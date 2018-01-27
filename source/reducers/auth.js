import {
  USER_ACCESS_REQUESTED,
  USER_LOGED_OUT
} from 'constants';
import { auth }           from 'utilities/auth';

// let initialState = auth.all() || {};
let initialState = {
  user: null,
  headers: [],
  roles: null
};

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case USER_ACCESS_REQUESTED:
      debugger
      auth.set(action.data.user, action.data.headers, action.data.roles);
      return auth.user()
    case USER_LOGED_OUT:
      auth.clear();
      return Object.assign({});
    default:
      return state;
  }
}
