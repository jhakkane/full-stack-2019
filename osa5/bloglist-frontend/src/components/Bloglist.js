import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

const Bloglist = ({ blogs, addLike, removeBlog, user }) => {
  const sortedBlogs = Array.from(blogs)
  sortedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}
          removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

Bloglist.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Bloglist