import React from 'react'
import {connect} from 'react-redux'
import {addNotification, removeNotification} from '../reducers/notificationReducer'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnectodeForm = (props) => {

  const addAnecdote = (event) => {
    const anecdote = event.target.anecdote.value
    event.preventDefault()
    props.createAnecdote(anecdote)
    props.addNotification(`You added anecdote '${anecdote}'`)
    setTimeout(() => {
      props.removeNotification();
    }, 5000)

    event.target.anecdote.value = ''
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