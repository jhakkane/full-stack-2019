import React from 'react'
import {connect} from 'react-redux'
import {setNotification, removeNotification} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnectodeForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await props.createAnecdote(content)
    props.setNotification(`You added anecdote '${newAnecdote.content}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  createAnecdote,
  removeNotification
}

export default connect(null, mapDispatchToProps)(AnectodeForm)