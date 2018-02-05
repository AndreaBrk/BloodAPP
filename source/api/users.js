import { generateApiUrl, apiRequest } from './system'


export function fetchUsers(headers) {
  let rUrl = `${generateApiUrl()}/users`;

  return apiRequest('GET', 'users', {
    url: rUrl,
    body: null,
    headers
  });
}
export function UpdateUser(headers, params) {
  debugger
  let rUrl = `${generateApiUrl()}/users/${params.id}`;

  return apiRequest('PUT', 'users', {
    url: rUrl,
    body: params,
    headers
  });
}
export function deleteUser(params, headers) {
  let rUrl = `${generateApiUrl()}/users/${params.id}`;

  return apiRequest('DELETE', 'users', {
    url: rUrl,
    body: params,
    headers
  });
}
export function signUpUser(params: Object, headers: Object) {
  let rUrl = `${generateApiUrl()}/users`;

  return apiRequest('POST', 'users', {
    url: rUrl,
    body: params,
    headers
  });
}

export function resetPassword(params: Object, headers: Object) {
  let rUrl = `${generateApiUrl()}/users/reset_password`;

  return apiRequest('POST', 'password', {
    url: rUrl,
    body: params,
    headers
  });
}