import React, { PropTypes } from 'react'

import styles from './style.css'

export default class Signup extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    onLogin: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onUserNameChange: PropTypes.func,
    password: PropTypes.string,
    username: PropTypes.string,
    isLoading: PropTypes.bool,
    successMessage: PropTypes.string,
  }

  static defaultProps = {
    error: '',
    username: '',
    password: '',
    isLoading: false,
  }

  componentWillUnmount() {
    this.props.destroySignup()
  }

  onUserNameChange = e => {
    this.props.onUserNameChange(e.target.value)
  }

  onPasswordChange = e => {
    this.props.onPasswordChange(e.target.value)
  }

  backToLogin = () => {
    this.props.goTo('/')
  }

  onButtonClick = () => {
    if (this.props.isLoading) {
      return
    }
    this.props.onLogin()
  }

  render() {
    const { errorMessage, isLoading, successMessage } = this.props
    return (
     <div className={styles['main-container']}>
       <div className={styles.container}>
         <div onClick={this.backToLogin}>Back to login</div>
         <div className={styles['input-container']}>
           <label>Username</label>
           <input type='text' onChange={this.onUserNameChange} value={this.props.username} />
         </div>
         <div className={`${styles['input-container']} ${styles['password-container']}`}>
           <label>Password</label>
           <input type='password' onChange={this.onPasswordChange} value={this.props.password} />
         </div>
         <div className={styles['error-container']}>
           {errorMessage && <span className={styles.error}>{errorMessage}</span>}
           {isLoading && <span>Loading...</span>}
           {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}
         </div>
         <button className={styles.button} onClick={this.onButtonClick}>Sign Up</button>
       </div>
     </div>
    )
  }
}
