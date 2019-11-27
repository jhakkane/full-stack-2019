import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'

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
    store.dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().map(anecdote => 
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          handleClick={vote} 
        />
      )}
    </div>
  )
}

export default AnecdoteList