import { ActionTypes } from '../constants/index'

export function onSignup(payload) {
  return {
    type: ActionTypes.ON_SIGNUP,
    payload
  }
}

export function onSignupUserNameChange(payload) {
  return {
    type: ActionTypes.ON_SIGNUP_USER_NAME_CHANGE,
    payload
  }
}

export function onSignupPasswordChange(payload) {
  return {
    type: ActionTypes.ON_SIGNUP_PASSWORD_CHANGE,
    payload
  }
}

export function showSignupLoading(payload) {
  return {
    type: ActionTypes.SHOW_SIGNUP_LOADING,
    payload
  }
}

export function onSignupFailure(payload) {
  return {
    type: ActionTypes.ON_SIGNUP_FAILURE,
    payload
  }
}

export function onSignupSuccess(payload) {
  return {
    type: ActionTypes.ON_SIGNUP_SUCCESS,
    payload
  }
}

export function destroySignup(payload) {
  return {
    type: ActionTypes.DESTROY_SIGNUP,
    payload
  }
}