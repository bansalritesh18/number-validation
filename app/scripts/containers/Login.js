import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from '../components/Login'

import { destroyLogin, goTo, onLogin, onUserNameChange, onPasswordChange } from '../actions'

export function LoginContainer(props) {
  return (
    <Login
      error={props.error}
      onLogin={props.onLogin}
      onPasswordChange={props.onPasswordChange}
      onUserNameChange={props.onUserNameChange}
      password={props.password}
      username={props.username}
      isLoading={props.isLoading}
      goTo={props.goTo}
      destroyLogin={props.destroyLogin}
      />
  )
}

export const mapStateToProps = state => {
  const userState = state.get('user').toJS()
  return {
    error: userState.error,
    password: userState.password,
    username: userState.username,
    isLoading: userState.isLoading,
  }
}

export default connect(mapStateToProps, {
  destroyLogin, goTo, onLogin, onUserNameChange, onPasswordChange
})(LoginContainer)
