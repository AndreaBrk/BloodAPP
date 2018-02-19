
import  * as api                        from 'api/users';

export function changePass(headers, params) {
  return dispatch => {
    return api.changePass(headers, params)
  }
}