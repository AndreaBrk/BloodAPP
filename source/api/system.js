/* @flow */

import request                    from 'superagent'
import Promise                    from 'promise'
import { history }                from '../store';
import  { auth }                  from '../utilities/auth';
// import { authToken, SessionReplay } from '../utilities/localstorage'


// const replayer = new SessionReplay()

// Flow types:
type SerializedBody = { data: {type: string; attributes: Object; relationships: Object } }

function jsonBody(type: string, attributes: Object): SerializedBody {
  let { relationships, mode, ...bodyData } = attributes

  return Object.assign({}, {
    data: {
      type,
      mode,
      attributes: bodyData,
      relationships:(relationships || {})
    }
  })
}

export function apiRequest(method: string, type: string, data: { url: string, body: Object, query: Object }): Promise {
  // const apiToken = authToken.get()
  method = method.toLowerCase()
  method = (method === 'delete') ? 'del' : method

  return new Promise( (fulfill, reject) => {
    let req = request[method]

    if (req === undefined) {
      return reject(`Cound not make a request using provided method: ${method}`)
    }

    if (method == 'get') {
      let firt = _.toPairs(data.body)[0]
      _.mapKeys(data.body, function(value, key, index) {
        if (firt[0] == key) {
          data.url += '?' + key + '=' + value
        } else {
          data.url += '&' + key + '=' + value  
        }
      }); 
    }

    
    req = req(data.url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    // if (apiToken !== null) {
    //   req.set('Authorization', `Bearer ${apiToken}`)
    // }

    if (data.headers) {
      req.set('access-token', data.headers['access-token'])
      req.set('uid', data.headers.uid)
      req.set('client', data.headers.client)
    }

    // if (data.body !== null && data.body !== undefined) {
    //   // let body_two = jsonBody(type, data.body)
    //   let body_two = jsonBody(type, data.body)
    //   // console.log('[api/shared::apiRequest] %s :: %o', data.url, body)
    //   // req.set('data', body_two.data)
    //   req.send(body_two.data.attributes)
    //   req.send(body_two)
    // }
    if (data.body !== null && data.body !== undefined) {
      let body_two = jsonBody(type, data.body)
      // console.log('[api/shared::apiRequest] %s :: %o', data.url, body)
      //req.set('data', body_two)
      
      req.send(body_two)
    }

    if (data.query !== null && data.query !== undefined) {
      req.query(data.query)
    }
    // console.log('[api/shared::apiRequest] %s %s', method, data.url, req)
    req.end( (err, response) => {
      // capturar el evento aca de cancan 
      if (response && response.status == 401) {
        auth.clear()
        // auth.clear
        history.push('/login');
        return null
      }
      
      // auth.clear app
      // import {history} from './store'
      // history.push('/login');
      if (err) {
        // console.log('[api/shared::apiRequest] REJECT: ', err, response)
        return reject(response.body)
      }
      // console.log('[api/shared::apiRequest] FULFILL: ', response)
      return fulfill(response.body)
    })
  })
}

export function generateApiUrl() {
  let coreApiUrl = 'http://localhost:3000'
  let coreApiVersion = 'v1'

  switch (process.env.NODE_ENV) {
    case 'production':
      coreApiUrl = 'https://avbapi.herokuapp.com'
      break
  }


  return `${coreApiUrl}/${coreApiVersion}`
}
