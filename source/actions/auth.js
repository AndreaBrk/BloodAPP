import {
  USER_ACCESS_REQUESTED,
  USER_ACCESS_ERROR,
  USER_LOGED_OUT,
  CREATED_USER
} from '../constants';

import { apiRequest } from '../api/system'
import  * as api from 'api/users';


export function loginUser (creds) {
  let config = {
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
  };
  return dispatch => {
    let rUrl = `${generateApiUrl()}/auth/sign_in`;
    return fetch(rUrl, config)
      .then((response, x, z) => {
        return response.json()
        .then(user => ({ user, response } ));
      }).then(({ user, response }) =>  {
        if (user.errors) {
           throw new Error(user.errors);
          // dispatch({ type: USER_ACCESS_ERROR, payload: user });
        } else {
          let params = {
            'access-token': null,
            uid: null,
            client: null,
          }
          let headers = response.headers
          if (headers.has('access-token')) {
            params['access-token'] = headers.get('access-token');
          } else if (headers.has('Access-token')) {
            params['access-token'] = headers.get('access-token');
          }
          if (headers.has('uid')) {
            params.uid = headers.get('uid');
          } else if (headers.has('Uid')) {
            params.uid = headers.get('Uid');
          }
          if (headers.has('client')) {
            params.client = headers.get('client');
          } else if (headers.has('Client')) {
            params.client = headers.get('Client');
          }
          apiRequest('POST', 'Role', {
            url: `${generateApiUrl()}/v1/users/get_role`,
            body: user.data
          }).then((json) => {
            let data = {
              user: user.data,
              headers: params,
              roles: json
            }
            dispatch({ type: USER_ACCESS_REQUESTED, data: data});
          });
          // dispatch({ type: USER_ACCESS_REQUESTED, payload: user, headers: params});
        }
      })
  }
}

export function resetPassword(creds: Object) {
  let config = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: creds.email,
      redirect_url: creds.redirect_url,
    })
  };

  return dispatch => {
    let rUrl = `${generateApiUrl()}/auth/password`;
    return fetch(rUrl, config)
      .then((response) => {
        return response.json()
      })
  }
}

export function updatePassword(params: Object, headers: Object) {
  return dispatch => {
    let rUrl = `${generateApiUrl()}/v1/users/password`;
    return apiRequest('POST', 'user', {
      url: rUrl,
      body: params,
      headers
    });
  }
}


export function logoutUser () {
  return dispatch => {
    return new Promise( (fulfill, reject) => {
      dispatch({ type: USER_LOGED_OUT });
      fulfill(true);
    });
  };
}

export function signUp(params) {
  return dispatch => {
    let rUrl = `${generateApiUrl()}/v1/users/create`;
    return apiRequest('POST', 'user', {
      url: rUrl,
      body: params,
      headers
    });
  }
}


function generateApiUrl(cred) {
  let coreApiUrl = 'http://localhost:3000'

  switch (process.env.NODE_ENV) {
    case 'production':
      coreApiUrl = 'https://avbapi.herokuapp.com'
      break
  }

  return `${coreApiUrl}`
}

