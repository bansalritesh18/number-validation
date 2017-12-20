import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { isNil, isEmpty } from 'ramda'

import { api } from '../utils/api'
import { ActionTypes } from '../constants/index'
import Config from '../Config'
const BASE_URL = Config.url

import { goTo, onLoginSuccess, numberValidated, validateNumberFailure,
  updateLeftAttempts, onLoginFailure, showLoginLoading } from '../actions'
import { onLogout } from './login'

const VALIDATE_NUMBER_URL = `${BASE_URL}/validateNumber`

export function* validateNumber(action) {
  try {
    const number = action.payload
    if (!number || number.length === 0 || number.length > 2) {
      yield put(validateNumberFailure({ error: 'Not in specified range.' }))
      return
    }
    const token = localStorage.getItem('token')
    const response = yield call(api, VALIDATE_NUMBER_URL, {
      method: 'POST',
      body: {
        number,
        token,
      }
    })
    if (response.success) {
      yield put(numberValidated('Number matched.'))
    }
    else {
      localStorage.setItem('attempts', response.attempts)
      yield put(updateLeftAttempts(response.attempts))
      yield put(validateNumberFailure({ error: '' }))
    }

  }
  catch (err) {
    let message = err.message
    if (err.body && err.body.code === 'MAX_ATTEMPTS_REACHED') {
      yield onLogout()
      yield put(goTo('/'))
      return
    }
    if (err.body && err.body.message) {
      message = err.body.message
    }
    yield put(validateNumberFailure({ error: message }))
  }
}

export function* watchValidateNumber() {
  yield takeLatest(ActionTypes.VALIDATE_NUMBER, validateNumber)
}
