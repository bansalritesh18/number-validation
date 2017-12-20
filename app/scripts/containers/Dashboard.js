import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Search } from '../components'

import { validateNumber, onLogout } from '../actions'

class Dashboard extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }

  state = {
    number: ''
  }

  onChange = e => {
    const previousValue = this.state.number
    const updatedValue = e.target.value
    let newValue = updatedValue
    if (isNaN(updatedValue)) {
      newValue = previousValue
    }
    this.setState({ number: newValue })
  }

  validateNumber = () => {
    this.props.validateNumber(this.state.number)
  }

  render() {
    const { successMessage, errorMessage } = this.props
    return (
      <div>
        <div>Please enter a number between 0 to 99</div>
        <div>Attempts Left: {this.props.attempts}</div>
        <input type='text' maxLength={'2'} onChange={this.onChange} value={this.state.number} />
        <div className={'display-flex'}>
          <div className={'button flex-one'} onClick={this.props.onLogout}>Logout</div>
          <div className={'button flex-one'} onClick={this.validateNumber}>Validate Number</div>
        </div>
        {successMessage && <div className={'success'}>{successMessage}</div>}
        {errorMessage && <div className={'error'}>{errorMessage}</div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const selectState = state.get('dashboard').toJS()
  return {
    attempts: selectState.attempts,
    successMessage: selectState.successMessage,
    errorMessage: selectState.errorMessage,
  }
}

export default connect(mapStateToProps, {
  validateNumber, onLogout,
})(Dashboard)
