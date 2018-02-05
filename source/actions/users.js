
import  * as api                        from 'api/users';

export function UpdateUser(headers, params) {
  return dispatch => {
    return api.UpdateUser(headers, params)
  }
}