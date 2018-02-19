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

