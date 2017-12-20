import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { isNil, isEmpty } from 'ramda'

import { api } from '../utils/api'

import { ActionTypes } from '../constants/index'
import Config from '../Config'
const BASE_URL = Config.url

import { goTo, onLoginSuccess, updateLeftAttempts, onLoginFailure, showLoginLoading } from '../actions'
import { getUsername, getPassword } from '../reducers/Login'

const LOGIN_URL = `${BASE_URL}/login`
const LOGOUT_URL = `${BASE_URL}/logout`

export function* onLogin() {
  try {
    const username = yield select(getUsername)
    if (isNil(username) || isEmpty(username)) {
      yield put(onLoginFailure({ error: 'Username must be provided.' }))
      return
    }
    const password = yield select(getPassword)
    yield put(showLoginLoading(true))

    const response = yield call(api, LOGIN_URL, {
      method: 'POST',
      body: {
        username, password
      }
    })
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('token', response.token)
    localStorage.setItem('username', response.username)
    localStorage.setItem('attempts', response.attempts)
    yield put(updateLeftAttempts(response.attempts))
    yield put(onLoginSuccess({ user: response, isLoading: false }))
    yield put(goTo('/dashboard'))
  }
  catch (err) {
    let message = err.message
    if (err.body && err.body.message) {
      message = err.body.message
    }
    yield put(onLoginFailure({ error: message }))
  }
}

export function* onLogout() {
  const token = localStorage.getItem('token')
  yield call(api, LOGOUT_URL, {
    method: 'DELETE',
    body: {
      token
    }
  })
  yield localStorage.removeItem('username')
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('isLoggedIn')
  yield localStorage.removeItem('attempts')
  yield put(goTo('/'))
}

export function* watchOnLogout() {
  yield takeLatest(ActionTypes.ON_LOGOUT, onLogout)
}

export function* watchOnLogin() {
  yield takeLatest(ActionTypes.ON_LOGIN, onLogin)
}
