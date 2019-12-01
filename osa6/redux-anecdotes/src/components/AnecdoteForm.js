import React from 'react'
import {connect} from 'react-redux'
import {addNotification, removeNotification} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnectodeForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
    props.addNotification(`You added anecdote '${newAnecdote.content}'`)
    setTimeout(() => {
      props.removeNotification();
    }, 5000)
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
  addNotification,
  createAnecdote,
  removeNotification
}

export default connect(null, mapDispatchToProps)(AnectodeForm)