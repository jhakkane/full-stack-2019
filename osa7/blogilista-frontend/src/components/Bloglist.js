import React from 'react'
import { connect } from 'react-redux'
import {
  Link,
  useRouteMatch,
} from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Bloglist = ({ ...props }) => {

  let match = useRouteMatch()

  return (
    <Table striped bordered>
      <tbody>
        {props.sortedBlogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`${match.path}/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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