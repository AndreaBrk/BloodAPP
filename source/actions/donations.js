import {
  RECEIVED_DONATIONS,
  DONATION_EVENT_CREATED,
  CREATED_DONATION,
  RECEIVED_MY_DONATIONS,
  DELETED_DONATION
}                                       from '../constants';
import  * as api                        from 'api/donations';

export function fetchDonations(headers, params) {
  return dispatch => {
    return api.fetchDonations(headers, params)
      .then((json) => {
        dispatch({
          type: RECEIVED_DONATIONS,
          data: json,
        });
      })
      .catch(err => {
      })
  }
}
export function createDonationEvent(headers, params) {
  return dispatch => {
    return api.createDonationEvent(headers, params)
      .then((json) => {
        dispatch({
          type: CREATED_DONATION,
          data: json,
        });
      })
      .catch(err => {
      })
  }
}

export function deleteDonationEvent(headers, params) {
  return dispatch => {
    return api.deleteDonationEvent(headers, params)
      .then((json) => {
        dispatch({
          type: DELETED_DONATION,
          data: params,
        });
      })
      .catch(err => {
      })
  }
}

export function fetchMyDonations(headers, params) {
  return dispatch => {
    return api.fetchMyDonations(headers, params)
      .then((json) => {
        dispatch({
          type: RECEIVED_MY_DONATIONS,
          data: json,
        });
      })
      .catch(err => {
      })
  }
}