import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import Bloglist from './components/Bloglist'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loggedInUserReducer'
import './index.css'
import NavigationMenu from './components/NavigationMenu'

function App ({ initializeBlogs, loggedInUser, setLoggedInUser }) {

  const newBlogForm = React.createRef()

  useEffect(() => {
    blogService.
      getAll().
      then(initialBlogs => initializeBlogs(initialBlogs))
  }, [initializeBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setLoggedInUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [setLoggedInUser])

  const closeForm = () => {
    newBlogForm.current.toggleVisibility()
  }

  const blogPage = () =>
    <div>
      <h2>Blogs</h2>
      <Bloglist/>
      <Togglable buttonLabel="New blog" ref={newBlogForm}>
        <NewBlogForm closeForm={closeForm}/>
      </Togglable>
    </div>


  return (
    <div className="container">
      <Notification/>
      <Router>
        <NavigationMenu />

        <Route exact path="/" render={() => loggedInUser ? <Redirect to="/blogs" /> : <Redirect to="/login" />} />
        <Route path="/login" render={() => <LoginForm />} />

        <Route exact path="/blogs" render={() => blogPage()} />
        <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />

        <Route exact path="/users" render={() => <UsersList />} />
        <Route exact path="/users/:id" render={({ match }) => <User userId={match.params.id} />} />
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