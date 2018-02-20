import { BASE_URL } from 'constants'
import { apiRequest } from './system'


export function fetchDonations(headers: Object, params: Object) {
  const rUrl = `${BASE_URL}/v1/donation_events`
  return apiRequest('GET', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  })
}

export function createDonationEvent(headers: Object, params: Object) {
  const rUrl = `${BASE_URL}/v1/donation_events`
  return apiRequest('POST', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  })
}

export function deleteDonationEvent(headers: Object, params: Object) {
  const rUrl = `${BASE_URL}/v1/donation_events/${params.id}`
  return apiRequest('DELETE', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  })
}

export function fetchMyDonations(headers: Object, params: Object) {
  const rUrl = `${BASE_URL}/v1/donation_events/index_owner`
  return apiRequest('GET', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  })
}

