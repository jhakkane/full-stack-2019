import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const newBlogForm = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const formatBlogForBackEnd = (blog) => {
    return {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id
    }
  }

  const addLike = (blogToUpdate) => {
    let formattedBlog = formatBlogForBackEnd(blogToUpdate)
    formattedBlog.likes++
    blogService
      .updateBlog(blogToUpdate.id, formattedBlog)
      .then(updatedBlog => {
        let newBlogs = blogs.filter(blog => blog.id !== updatedBlog.id)
        newBlogs.push(updatedBlog)
        setBlogs(newBlogs)
        createNotification(`You liked the blog ${updatedBlog.title}!`)
      })
      .catch(() => {
        createNotification('Adding a like failed!', 'error')
      })
  }

  const removeBlog = (blogToRemove) => {
    let removalConfirmed = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!removalConfirmed) return

    blogService
      .removeBlog(blogToRemove.id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
        createNotification(`Blog ${blogToRemove.title} has been deleted!`)
      })
      .catch(() => {
        createNotification('Removing the blog failed!', 'error')
      })
  }

  const createNotification = (text, style) => {
    style = style || 'success'
    let newMessage = { text, style }
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = blog => {
    newBlogForm.current.toggleVisibility()
    blogService
      .createNew(blog)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        createNotification(`A new blog ${blog.title} by ${blog.author} added`)
      })
      .catch(() => {
        createNotification('Creating new blog failed!', 'error')
      })
  }

  const handleLogin = (credentials) => {
    loginService
      .login(credentials)
      .then(user => {
        setUser(user)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
      })
      .catch(() => {
        createNotification('Wrong username or password!', 'error')
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>

      <h2>Blogs</h2>

      <Notification message={message} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          Logout
        </button>
      </p>

      <Bloglist blogs={blogs} addLike={addLike} removeBlog={removeBlog} user={user}/>

      <Togglable buttonLabel="New blog" ref={newBlogForm}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

    </div>
  )

}

export default App
