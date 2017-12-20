import Immutable from 'immutable'
import { createReducer } from '../../utils/helpers'

import { ActionTypes } from '../../constants/index'

export const initialState = Immutable.fromJS({
  username: '',
  password: '',
  errorMessage: '',
  successMessage: '',
  showLoading: false,
})

export const loginState = Immutable.fromJS(initialState)

export default {
  signup: createReducer(loginState, {
    [ActionTypes.ON_SIGNUP_USER_NAME_CHANGE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('username', action.payload)
        stateMap.set('errorMessage', '')
      })
    },
    [ActionTypes.ON_SIGNUP_PASSWORD_CHANGE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('password', action.payload)
        stateMap.set('errorMessage', '')
      })
    },
    [ActionTypes.ON_SIGNUP](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('isLoading', true)
        stateMap.set('errorMessage', '')
      })
    },
    [ActionTypes.SHOW_SIGNUP_LOADING](state, action) {
      return state.set('isLoading', action.payload)
    },
    [ActionTypes.ON_SIGNUP_FAILURE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('errorMessage', action.payload.errorMessage)
        stateMap.set('successMessage', '')
        stateMap.set('isLoading', false)
      })
    },
    [ActionTypes.ON_SIGNUP_SUCCESS](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('errorMessage', '')
        stateMap.set('successMessage', action.payload)
        stateMap.set('isLoading', false)
      })
    },
    [ActionTypes.DESTROY_SIGNUP]() {
      return initialState
    },
  }),
}

export const getUsername = state => {
  return state.get('signup').toJS().username
}

export const getPassword = state => {
  return state.get('signup').toJS().password
}

export const getErrorMessage = state => {
  return state.get('signup').toJS().errorMessage
}
