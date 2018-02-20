import {
  BASE_URL,
  USER_ACCESS_REQUESTED,
  USER_ACCESS_ERROR,
  USER_LOGED_OUT,
  CREATED_USER
} from 'constants'

import { apiRequest } from 'api/system'
import  * as api from 'api/users'

export function loginUser (creds) {
  const config = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: creds.email,
      password: creds.password,
    })
  }
  return dispatch => {
    const rUrl = `${BASE_URL}/auth/sign_in`
    return fetch(rUrl, config)
      .then((response, x, z) => {
        return response.json()
        .then(user => ({ user, response } ))
      }).then(({ user, response }) =>  {
        if (user.errors) {
           throw new Error(user.errors)
        } else {
          const params = {
            'access-token': null,
            uid: null,
            client: null,
          }

          const headers = response.headers
          if (headers.has('access-token')) {
            params['access-token'] = headers.get('access-token')
          } else if (headers.has('Access-token')) {
            params['access-token'] = headers.get('access-token')
          }

          if (headers.has('uid')) {
            params.uid = headers.get('uid')
          } else if (headers.has('Uid')) {
            params.uid = headers.get('Uid')
          }

          if (headers.has('client')) {
            params.client = headers.get('client')
          } else if (headers.has('Client')) {
            params.client = headers.get('Client')
          }

          apiRequest('GET', 'Role', {
            url: `${BASE_URL}/v1/users/get_role`,
            body: {id: user.data.id}
          }).then((json) => {
            const data = {
              user: user.data,
              headers: params,
              roles: json
            }
            dispatch({ type: USER_ACCESS_REQUESTED, data: data})
          })
          // dispatch({ type: USER_ACCESS_REQUESTED, payload: user, headers: params})
        }
      })
  }
}

export function resetPassword(params: Object) {
  return dispatch => {
    const rUrl = `${BASE_URL}/v1/users/reset_password`
    return apiRequest('POST', 'user', {
      url: rUrl,
      body: params,
      headers: null
    })
  }
}

export function updatePassword(params: Object, headers: Object) {
  return dispatch => {
    const rUrl = `${BASE_URL}/v1/users/password`
    return apiRequest('POST', 'user', {
      url: rUrl,
      body: params,
      headers
    })
  }
}

export function logoutUser () {
  return dispatch => {
    return new Promise( (fulfill, reject) => {
      dispatch({ type: USER_LOGED_OUT })
      fulfill(true)
    })
  }
}

export function signUp(params) {
  return dispatch => {
    const rUrl = `${BASE_URL}/v1/users`
    return apiRequest('POST', 'user', {
      url: rUrl,
      body: params,
      headers: null
    })
  }
}

