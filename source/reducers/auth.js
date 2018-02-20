import {
  USER_ACCESS_REQUESTED,
  USER_LOGED_OUT,
  RECEIVED_USER
} from 'constants'
import auth                      from 'auth'

// const initialState = auth.all() || {}
const initialState = {
  user: null,
  headers: [],
  roles: null
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case USER_ACCESS_REQUESTED:
      auth.set(action.data.headers, action.data.user, action.data.roles)
      return auth.user()
    case USER_LOGED_OUT:
      auth.clear()
      return Object.assign({})
    case RECEIVED_USER:
      return {
        ...state,
        user: action.data
      }
    default:
      return state
  }
}
