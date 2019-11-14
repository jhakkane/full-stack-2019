import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [extended, setExtended] = useState(false)

  const extendedContents = () => (
    <div>
      {blog.title} {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes} likes <button onClick={() => addLike(blog)}>Like</button><br/>
      Added by {blog.user.username}<br/>
      {
        blog.user && user.username === blog.user.username &&
        <button onClick={() => removeBlog(blog)}>Remove</button>
      }
    </div>
  )

  const conciseContents = () => (
    <div>
      {blog.title} {blog.author}
    </div>
  )

  return (
    <div style={blogStyle} onClick={() => setExtended(!extended)}>
      {extended ? extendedContents() : conciseContents() }
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog