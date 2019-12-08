import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Bloglist from './components/Bloglist'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import './index.css'

function App({ blogs, initializeBlogs, loggedInUser, setNotification, setLoggedInUser, 
  ...props }) {

  const newBlogForm = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => initializeBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setLoggedInUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogout = () => {
    setLoggedInUser(null)
    window.localStorage.clear()
  }

  const closeForm = () => {
    newBlogForm.current.toggleVisibility()
  }

  const blogPage = () => (
    <div>
      <h2>Blogs</h2>
      <Bloglist/>
      <Togglable buttonLabel="New blog" ref={newBlogForm}>
        <NewBlogForm closeForm={closeForm}/>
      </Togglable>
    </div>
  )

  const loggedInUserInfo = () => (
    <p>
      {loggedInUser.name} logged in
      <button onClick={handleLogout}>
        Logout
      </button>
    </p>
  )

  return (
    <div>
      <Notification/>

      {loggedInUser && loggedInUserInfo()}

      <Router>
        <Route exact path="/" render={() => loggedInUser ?
          blogPage() : <Redirect to="/login" />
        } />
        <Route path="/users" render={() => <UsersList />} />
        <Route path="/login" render={() => <LoginForm />} />
      </Router>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  setLoggedInUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
