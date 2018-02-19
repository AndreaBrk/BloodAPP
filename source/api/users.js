import { generateApiUrl, apiRequest } from './system'

export function UpdateUser(headers, params) {
  let rUrl = `${generateApiUrl()}/users/${params.id}`;

  return apiRequest('PUT', 'users', {
    url: rUrl,
    body: params,
    headers
  });
}
export function getUser(params: Object, headers: Object) {
  let rUrl = `${generateApiUrl()}/users/${params.id}`;

  return getUser('GET', 'users', {
    url: rUrl,
    body: null,
    headers
  });
}


