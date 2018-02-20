/**
 * En este fichero definimos las constantes de la aplicación.
 */

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://avbapi.herokuapp.com' : 'http://localhost:3000'

// Constantes utilizadas por los actions/reducers.
export const USER_ACCESS_REQUESTED                      = 'USER_ACCESS_REQUESTED'
export const USER_ACCESS_ERROR                          = 'USER_ACCESS_ERROR'
export const USER_LOGED_OUT                             = 'USER_LOGED_OUT'
export const CREATED_USER                               = 'CREATED_USER'
export const RECEIVE_USERS                              = 'RECEIVE_USERS'
export const RECEIVED_USER                              = 'RECEIVED_USER'
export const RECEIVED_DONATIONS                         = 'RECEIVED_DONATIONS'
export const DONATION_EVENT_CREATED                     = 'DONATION_EVENT_CREATED'
export const RECEIVED_MY_DONATIONS                      = 'RECEIVED_MY_DONATIONS'
export const DELETED_DONATION                           = 'DELETED_DONATION'
export const CREATED_DONATION                           = 'CREATED_DONATION'


