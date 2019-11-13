import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'

function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [message, setMessage] = useState('') 

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

  const createNotification = (text, style) => {
    style = style || 'success'
    let newMessage = {text, style}
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }

  const createBlog = blog => {
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

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = { username, password }
    loginService
      .login(credentials)
      .then(user => {
        setUser(user) 
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))       
        setUsername('')
        setPassword('')
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
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
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
      <Bloglist blogs={blogs} />
      <NewBlogForm createBlog={createBlog}/>

    </div>
  )

}

export default App;
