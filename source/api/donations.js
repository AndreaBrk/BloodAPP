import { generateApiUrl, apiRequest } from './system'


export function fetchDonations(headers: Object, params: Object) {
  let rUrl = `${generateApiUrl()}/donation_events`;
  return apiRequest('GET', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

export function createDonationEvent(headers: Object, params: Object) {
  let rUrl = `${generateApiUrl()}/donation_events`;
  return apiRequest('POST', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

export function deleteDonationEvent(headers: Object, params: Object) {
  let rUrl = `${generateApiUrl()}/donation_events/${params.id}`;
  return apiRequest('DELETE', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

export function fetchMyDonations(headers: Object, params: Object) {
  let rUrl = `${generateApiUrl()}/donation_events/index_owner`;
  return apiRequest('GET', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

export function editDonationEvent(headers: Object, params: Objects) {
  let rUrl = `${generateApiUrl()}/donation_events/${params.id}`;
  return apiRequest('PUT', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

export function changeStatus(headers: Object, params: Objects) {
  let rUrl = `${generateApiUrl()}/donation_events/change_status`;
  return apiRequest('GET', 'donations', {
    url: rUrl,
    body: params,
    headers: headers
  });
}

