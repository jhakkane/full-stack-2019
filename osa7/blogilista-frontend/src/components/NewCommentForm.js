import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const NewCommentForm = (props) => {
  const [
    textField,
    resetText
  ] = useField('text')

  const submit = (event) => {
    event.preventDefault()
    const comment = { text: textField.value }
    blogService.
      addComment(props.blogId, comment).
      then((updatedBlog) => {
        props.setNotification(`A new comment '${comment.text}' added`)
        props.updateBlog(updatedBlog)
        resetText()
      }).
      catch(() => {
        props.setNotification('Creating new comment failed!', 'error')
      })
  }

  return (
    <div className="newBlogForm">
      <form onSubmit={submit}>
        <div>
          <input
            {...textField}
            name="URL"/>
          <button type="submit">Add comment</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogId: ownProps.blogId,
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  updateBlog,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm)