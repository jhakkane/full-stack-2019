import React from 'react'
import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {

  const vote = async (id) => {
    const anecdote = await props.voteAnecdote(id)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>         
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
          handleClick={vote} 
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes.filter(anecdote => 
      !state.filter || anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  setNotification,
  removeNotification,
  voteAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
