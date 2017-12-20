import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { isNil, isEmpty } from 'ramda'

import { api } from '../utils/api'

import { ActionTypes } from '../constants/index'
import Config from '../Config'
const BASE_URL = Config.url

import { goTo, onSignupFailure, onSignupSuccess, showSignupLoading } from '../actions'

const SIGNUP_URL = `${BASE_URL}/signup`

export function* onSignup(action) {
  try {
    const { username, password } = action.payload
    if (isNil(username) || isEmpty(username)) {
      yield put(onLoginFailure({ error: 'Username must be provided.' }))
      return
    }
    yield put(showSignupLoading(true))
    yield call(api, `${SIGNUP_URL}`, {
      method: 'POST' ,
      body: {
        username, password
      },
    })
    yield put(showSignupLoading(false))
    yield put(onSignupSuccess('User created successfully.'))
  }
  catch (err) {
    let message = err.message
    if (err.body && err.body.message) {
      message = err.body.message
    }
    yield put(showSignupLoading(false))
    yield put(onSignupFailure({ errorMessage: message }))
  }
}

export function* watchOnSignup() {
  yield takeLatest(ActionTypes.ON_SIGNUP, onSignup)
}
