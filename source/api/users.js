import { BASE_URL } from 'constants'
import { apiRequest } from './system'

export function updateUser(headers, params) {
  const rUrl = `${BASE_URL}/v1/users/${params.id}`

  return apiRequest('PUT', 'users', {
    url: rUrl,
    body: params,
    headers
  })
}

export function getUser(headers, params) {
  const rUrl = `${BASE_URL}/v1/users/${params.id}`

  return apiRequest('GET', 'users', {
    url: rUrl,
    body: null,
    headers
  })
}


