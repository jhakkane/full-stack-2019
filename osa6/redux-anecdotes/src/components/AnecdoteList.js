import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {addNotification, removeNotification} from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleClick(anecdote.id)}>vote</button>
    </div>
  </div>
)

const AnecdoteList = ({store}) => {

  const vote = (id) => {
    const anecdote = store.getState().anecdotes.find(a => a.id === id)
    const notification = `You voted '${anecdote.content}'`
    store.dispatch(addNotification(notification))
    store.dispatch(voteAnecdote(id))
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000)
  }

  const filterAnecdotes = () => {
    const anecdotes = store.getState().anecdotes
    const filter = store.getState().filter

    return anecdotes.filter(
        anecdote => !filter || anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .map(anecdote => 
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          handleClick={vote} />
        )
  }

  return (
    <div>
      {filterAnecdotes()}
    </div>
  )
}

export default AnecdoteList