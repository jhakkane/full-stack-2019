import React from 'react'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'

const NewBlogForm = ({ createBlog }) => {
  const [titleField, resetTitle] = useField('text')
  const [authorField, resetAuthor] = useField('text')
  const [urlField, resetUrl] = useField('text')

  const submit = event => {
    event.preventDefault()
    const blog = { title: titleField.value, author: authorField.value, url: urlField.value }
    createBlog(blog)
    resetTitle()
    resetAuthor()
    resetUrl()
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
  createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm