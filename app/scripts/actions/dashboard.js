import { ActionTypes } from '../constants/index'

export function validateNumber(payload) {
  return {
    type: ActionTypes.VALIDATE_NUMBER,
    payload
  }
}

export function updateLeftAttempts(payload) {
  return {
    type: ActionTypes.UPDATE_ATTEMPTS_LEFT,
    payload,
  }
}

export function numberValidated(payload) {
  return {
    type: ActionTypes.NUMBER_VALIDATED,
    payload,
  }
}

export function validateNumberFailure(payload) {
  return {
    type: ActionTypes.VALIDATE_NUMBER_FAILURE,
    payload,
  }
}