import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD':
      return sorted([...state, action.data])
    case 'INIT':
      return sorted(action.data)
    case 'UPDATE':
      const newAnecdote = action.data
      const newState = state.map(obj => obj.id !== newAnecdote.id ? obj : newAnecdote)
      return sorted(newState)
    default:
      return state;
  }
}

const sorted = (anecdotes) => {
  const newAnecdotes = [...anecdotes]
  newAnecdotes.sort((a1, a2) => a2.votes - a1.votes)
  return newAnecdotes
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
    return newAnecdote
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(obj => obj.id === id)
    let newAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    newAnecdote = await anecdoteService.update(newAnecdote)
    dispatch({
      type: 'UPDATE',
      data: newAnecdote
    })
    return newAnecdote
  }
}

export default reducer