import React from 'react';
import Notification from './components/Notification';
import AnectodeForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter'

const App = () => {
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

export default App