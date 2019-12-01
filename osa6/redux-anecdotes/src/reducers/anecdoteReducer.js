const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(obj => obj.id === id)
      const newAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const newState = state.map(obj => obj.id !== id ? obj : newAnecdote)
      newState.sort((a1, a2) => a2.votes - a1.votes)
      return newState
    case 'INIT':
      return action.data
    default:
      return state;
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'ADD',
    data
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export default reducer