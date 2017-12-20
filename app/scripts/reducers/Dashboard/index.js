import Immutable from 'immutable'
import { createReducer } from '../../utils/helpers'

import { ActionTypes } from '../../constants/index'

export const initialState = Immutable.fromJS({
  attempts: localStorage.getItem('attempts') || 3,
  successMessage: '',
  errorMessage: '',
})

export const loginState = Immutable.fromJS(initialState)

export default {
  dashboard: createReducer(loginState, {
    [ActionTypes.UPDATE_ATTEMPTS_LEFT](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('attempts', action.payload)
      })
    },
    [ActionTypes.NUMBER_VALIDATED](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('successMessage', action.payload)
        stateMap.set('errorMessage', '')
      })
    },
    [ActionTypes.VALIDATE_NUMBER_FAILURE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('errorMessage', action.payload.error)
        stateMap.set('successMessage', '')
      })
    },
  }),
}

export const getUsername = state => {
  return state.get('user').toJS().username
}

export const getPassword = state => {
  return state.get('user').toJS().password
}

export const getErrorMessage = state => {
  return state.get('user').toJS().error
}
