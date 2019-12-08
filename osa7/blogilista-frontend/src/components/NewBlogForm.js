import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const NewBlogForm = (props) => {
  const [titleField, resetTitle] = useField('text')
  const [authorField, resetAuthor] = useField('text')
  const [urlField, resetUrl] = useField('text')

  const submit = event => {
    event.preventDefault()
    const blog = { title: titleField.value, author: authorField.value, url: urlField.value }
    blogService
      .createNew(blog)
      .then(newBlog => {
        props.addBlog(newBlog)
        props.setNotification(`A new blog ${blog.title} by ${blog.author} added`)
        resetTitle()
        resetAuthor()
        resetUrl()
        props.closeForm()
      })
      .catch(() => {
        props.setNotification('Creating new blog failed!', 'error')
      })
  }

  return (
    <div className='newBlogForm'>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            {...titleField}
            name="Title"/>
        </div>
        <div>
          Author
          <input
            {...authorField}
            name="Author"/>
        </div>
        <div>
          URL
          <input
            {...urlField}
            name="URL"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setNotification,
  addBlog,
}

export default connect(null, mapDispatchToProps)(NewBlogForm)
