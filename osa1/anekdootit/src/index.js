import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const emptyVotes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  const [votes, setVotes] = useState(emptyVotes)

  function selectRandom() {
    let i = Math.floor(Math.random()*anecdotes.length)
    setSelected(i)
  }

  function vote() {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  function selectBest() {
    let indexOfBest = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > votes[indexOfBest]) {
        indexOfBest = i
      }
    }
    return anecdotes[indexOfBest]
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button handleClick={selectRandom} text="next anecdote"></Button>
      <Button handleClick={vote} text="vote"></Button>

      <h1>anecdote with most votes</h1>
      <p>
        {selectBest()}
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)