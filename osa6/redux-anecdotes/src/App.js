import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Notification from './components/Notification';
import AnectodeForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initAnecdotes} from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => props.initAnecdotes(anecdotes))
  }, [props])

  return (
    <div>
      <h1>Programming anecdotes</h1>
      <Notification />
      <Filter />
      <AnectodeForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(null, {initAnecdotes})(App)