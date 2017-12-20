import { ActionTypes } from '../constants/index'

export function onLogin(payload) {
  return {
    type: ActionTypes.ON_LOGIN,
    payload
  }
}

export function onLogout(payload) {
  return {
    type: ActionTypes.ON_LOGOUT,
    payload
  }
}

export function onLoginSuccess(payload) {
  return {
    type: ActionTypes.ON_LOGIN_SUCCESS,
    payload
  }
}

export function onLoginFailure(payload) {
  return {
    type: ActionTypes.ON_LOGIN_FAILURE,
    payload
  }
}

export function onUserNameChange(payload) {
  return {
    type: ActionTypes.ON_USER_NAME_CHANGE,
    payload
  }
}

export function onPasswordChange(payload) {
  return {
    type: ActionTypes.ON_PASSWORD_CHANGE,
    payload
  }
}

export function showLoginLoading(payload) {
  return {
    type: ActionTypes.SHOW_LOGIN_LOADING,
    payload
  }
}

export function destroyLogin(payload) {
  return {
    type: ActionTypes.DESTROY_LOGIN,
  }
}