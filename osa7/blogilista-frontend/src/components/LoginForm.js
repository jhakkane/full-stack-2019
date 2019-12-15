import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import {
  withRouter
} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'

const LoginForm = ({ setLoggedInUser, setNotification, ...props }) => {

  const [
    usernameField,
    resetUsername
  ] = useField('text')
  const [
    passwordField,
    resetPassword
  ] = useField('password')

  const prepareLogin = (event) => {
    event.preventDefault()
    const credentials = { username: usernameField.value,
      password: passwordField.value }
    resetUsername()
    resetPassword()
    loginService.
      login(credentials).
      then((user) => {
        setLoggedInUser(user)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
        props.history.push('/')
      }).
      catch((error) => {
        console.log(error)
        setNotification('Wrong username or password!', 'error')
      })
  }

  return (
    <div className="loginForm">
      <h2>Log in to application</h2>
      <Form onSubmit={prepareLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            { ...usernameField }
          ></Form.Control>

          <Form.Label>Password</Form.Label>
          <Form.Control
            { ...passwordField }
          ></Form.Control>

          <Button type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  setLoggedInUser,
  setNotification
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))