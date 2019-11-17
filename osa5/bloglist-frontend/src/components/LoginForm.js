import React from 'react'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {

  const [usernameField, resetUsername] = useField('text')
  const [passwordField, resetPassword] = useField('password')

  const prepareLogin = (event) => {
    event.preventDefault()
    resetUsername()
    resetPassword()
    handleLogin({ username: usernameField.value, password: passwordField.value })
  }

  return (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <form onSubmit={prepareLogin}>
        <div>
          Username
          <input {... usernameField }/>
        </div>
        <div>
          Password
          <input { ...passwordField }/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm