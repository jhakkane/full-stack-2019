import React from 'react'
import { connect } from 'react-redux'
import {
  Link,
  useRouteMatch,
} from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Bloglist = ({ loggedInUser, ...props }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let match = useRouteMatch()

  return (
    <div>
      {props.sortedBlogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`${match.path}/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
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