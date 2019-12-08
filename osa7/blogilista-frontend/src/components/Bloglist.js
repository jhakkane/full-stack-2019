import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Bloglist = ({ blogs, addLike, loggedInUser, ...props }) => {

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
      .then(updatedBlog => {
        props.updateBlog(updatedBlog)
        props.setNotification(`You liked the blog ${updatedBlog.title}!`)
      })
      .catch(() => {
        props.setNotification('Adding a like failed!', 'error')
      })
  }

  const remove = (blogToRemove) => {
    let removalConfirmed = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!removalConfirmed) return

    blogService
      .removeBlog(blogToRemove.id)
      .then(() => {
        props.removeBlog(blogToRemove.id)
        props.setNotification(`Blog ${blogToRemove.title} has been deleted!`)
      })
      .catch(() => {
        props.setNotification('Removing the blog failed!', 'error')
      })
  }

  return (
    <div>
      {props.sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={like}
          removeBlog={remove}
          user={loggedInUser}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    sortedBlogs: (() => {
      const sortedBlogs = Array.from(state.blogs)
      sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      return sortedBlogs
    })(),
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  setNotification,
  removeBlog,
  updateBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(Bloglist)