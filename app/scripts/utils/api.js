import fetch from 'isomorphic-fetch'

export function api(uri, action = {}) {
  const params = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: action.method || 'GET',
  }
  if (params.method !== 'GET') {
    params.body = JSON.stringify(action.body)
  }
  return fetch(uri, params).then(response => {
    if (response.ok) {
      return response.json()
    }
    const error = new Error()
    error.response = response
    error.status = response.status
    throw error
  }).catch(err => {
    const error = new Error()
    error.statusCode = err.status
    error.message = err.message
    if (error.message === 'Failed to fetch') {
      error.message = 'Unable to connect to the server.'
    }
    if (err.response) {
      return err.response.json().then(errorBody => {
        error.body = errorBody
        throw error
      })
    }
    throw error
  })
}
