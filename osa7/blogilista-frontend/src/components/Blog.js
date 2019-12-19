import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import NewCommentForm from '../components/NewCommentForm'

const Blog = ({ blog, removeBlog, updateBlog, setNotification, ...props }) => {

  const like = (blogToUpdate) => {
    const formatBlogForBackEnd = (blog) => {
      return {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes,
        user: blog.user.id
      }
    }

    let formattedBlog = formatBlogForBackEnd(blogToUpdate)
    formattedBlog.likes++
    blogService
      .updateBlog(blogToUpdate.id, formattedBlog)
      .then((updatedBlog) => {
        updateBlog(updatedBlog)
        setNotification(`You liked the blog ${updatedBlog.title}!`)
      })
      .catch(() => {
        setNotification('Adding a like failed!', 'error')
      })
  }

  const remove = (blogToRemove) => {
    let removalConfirmed = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!removalConfirmed) {
      return
    }

    blogService
      .removeBlog(blogToRemove.id)
      .then(() => {
        removeBlog(blogToRemove.id)
        setNotification(`Blog ${blogToRemove.title} has been deleted!`)
        props.history.push('/blogs')
      })
      .catch((error) => {
        console.log(error)
        setNotification('Removing the blog failed!', 'error')
      })
  }

  if (blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      {blog.url}<br/>
      {blog.likes} likes <button onClick={() => like(blog)}>Like</button><br/>
      Added by {blog.user ? blog.user.username : 'unknown'}<br/>
      {
        blog.user && props.loggedInUser.username === blog.user.username &&
        <button onClick={() => remove(blog)}>Remove</button>
      }<br/>
      {blog.comments &&
      <div>
        <h3>Comments</h3>
        <NewCommentForm blogId={blog.id}/>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>
              {comment.text}
            </li>
          )}
        </ul>
      </div>}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  removeBlog,
  updateBlog,
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.id),
    loggedInUser: state.loggedInUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))