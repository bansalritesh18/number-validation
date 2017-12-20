import Immutable from 'immutable'
import { createReducer } from '../../utils/helpers'

import { ActionTypes } from '../../constants/index'

export const initialState = Immutable.fromJS({
  username: localStorage.getItem('username') || '',
  password: '',
  user: {},
  error: '',
  showLoading: false,
})

export const loginState = Immutable.fromJS(initialState)

export default {
  user: createReducer(loginState, {
    [ActionTypes.ON_USER_NAME_CHANGE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('username', action.payload)
        stateMap.set('error', '')
      })
    },
    [ActionTypes.ON_PASSWORD_CHANGE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('password', action.payload)
        stateMap.set('error', '')
      })
    },
    [ActionTypes.ON_LOGIN_SUCCESS](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('user', action.payload.user)
        stateMap.set('isLoading', action.payload.isLoading)
        stateMap.set('error', '')
      })
    },
    [ActionTypes.SHOW_LOGIN_LOADING](state, action) {
      return state.set('isLoading', action.payload)
    },
    [ActionTypes.ON_LOGIN_FAILURE](state, action) {
      return state.withMutations(stateMap => {
        stateMap.set('error', action.payload.error)
        stateMap.set('isLoading', false)
      })
    },
    [ActionTypes.DESTROY_LOGIN]() {
      return initialState
    },
    [ActionTypes.ON_LOGOUT]() {
      return initialState
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
