
import {
  RECEIVED_USER
}                                       from 'constants'
import  * as api                        from 'api/users'

export function updateUser(headers, params) {
  return dispatch => {
    return api.updateUser(headers, params)
  }
}

export function getUser(headers, params) {
  return dispatch => {
    return api.getUser(headers, params)
      .then((json) => {
        dispatch({
          type: RECEIVED_USER,
          data: json,
        })
      })
  }
}
