import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Signup from '../components/Signup'

import { goTo, destroySignup, onSignup, onSignupUserNameChange, onSignupPasswordChange } from '../actions'

export function LoginContainer(props) {

  const onSignupButtonPress = () => {
    props.onSignup({ username: props.username, password: props.password })
  }

  return (
    <Signup
      errorMessage={props.errorMessage}
      onLogin={onSignupButtonPress}
      onPasswordChange={props.onSignupPasswordChange}
      onUserNameChange={props.onSignupUserNameChange}
      password={props.password}
      username={props.username}
      isLoading={props.isLoading}
      successMessage={props.successMessage}
      goTo={props.goTo}
      destroySignup={props.destroySignup}
      />
  )
}

export const mapStateToProps = state => {
  const userState = state.get('signup').toJS()
  return {
    errorMessage: userState.errorMessage,
    password: userState.password,
    username: userState.username,
    isLoading: userState.isLoading,
    successMessage: userState.successMessage,
  }
}

export default connect(mapStateToProps, {
  goTo, onSignup, onSignupUserNameChange, destroySignup, onSignupPasswordChange
})(LoginContainer)
