/* @flow */

import request                    from 'superagent'
import Promise                    from 'promise'
import { history }                from 'store'
import auth                       from 'auth'

function jsonBody(type, attributes) {
  const { relationships, mode, ...bodyData } = attributes

  return Object.assign({}, {
    data: {
      type,
      mode,
      attributes: bodyData,
      relationships:(relationships || {})
    }
  })
}

export function apiRequest(method, type, data) {
  const { url, body, query } = data

  method = method.toLowerCase()
  method = (method === 'delete') ? 'del' : method

  return new Promise( (fulfill, reject) => {
    let req = request[method]

    if (req === undefined) {
      return reject(`Cound not make a request using provided method: ${method}`)
    }

    if (method === 'get') {
      const firt = _.toPairs(data.body)[0]
      _.mapKeys(data.body, function(value, key, index) {
        if (firt[0] === key) {
          data.url += '?' + key + '=' + value
        } else {
          data.url += '&' + key + '=' + value
        }
      })
    }

    req = req(data.url)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    if (data.headers) {
      req.set('access-token', data.headers['access-token'])
      req.set('uid', data.headers.uid)
      req.set('client', data.headers.client)
    }

    if (data.body !== null && data.body !== undefined) {
      const body_two = jsonBody(type, data.body)
      req.send(body_two)
    }

    if (data.query !== null && data.query !== undefined) {
      req.query(data.query)
    }

    req.end( (err, response) => {
      // capturar el evento aca de cancan
      if (response && response.status === 401) {
        auth.clear()
        window.location.href='/login'
        return null
      }

      if (err) {
        return reject(response.body)
      }

      return fulfill(response.body)
    })
  })
}
