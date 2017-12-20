import React, { PropTypes } from 'react'

import styles from './style.css'

export default class Login extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    onLogin: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onUserNameChange: PropTypes.func,
    password: PropTypes.string,
    username: PropTypes.string,
    isLoading: PropTypes.bool,
    goTo: PropTypes.func,
  }

  static defaultProps = {
    error: '',
    username: '',
    password: '',
    isLoading: false,
  }

  onUserNameChange = e => {
    this.props.onUserNameChange(e.target.value)
  }

  onPasswordChange = e => {
    this.props.onPasswordChange(e.target.value)
  }

  onButtonClick = () => {
    if (this.props.isLoading) {
      return
    }
    this.props.onLogin()
  }

  onSignupClick = () => {
    this.props.goTo('signup')
  }

  componentWillUnmount() {
    this.props.destroyLogin()
  }

  render() {
    const { error, isLoading } = this.props
    return (
     <div className={styles['main-container']}>
       <div className={styles.container}>
         <div onClick={this.onSignupClick}>Sign up</div>
         <div className={styles['input-container']}>
           <label>Username</label>
           <input type='text' onChange={this.onUserNameChange} value={this.props.username} />
         </div>
         <div className={`${styles['input-container']} ${styles['password-container']}`}>
           <label>Password</label>
           <input type='password' onChange={this.onPasswordChange} value={this.props.password} />
         </div>
         <div className={styles['error-container']}>
           {error && <span className={styles.error}>{error}</span>}
           {isLoading && <span>Loading...</span>}
         </div>
         <button className={'button'} onClick={this.onButtonClick}>Login</button>
       </div>
     </div>
    )
  }
}
