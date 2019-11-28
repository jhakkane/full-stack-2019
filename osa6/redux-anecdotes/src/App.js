import React from 'react';
import Notification from './components/Notification';
import AnectodeForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter'

const App = (props) => {
  return (
    <div>
      <Notification store={props.store}/>
      <h2>Anecdotes</h2>
      <Filter store={props.store}/>
      <AnectodeForm store={props.store}/>
      <AnecdoteList store={props.store}/>
    </div>
  )
}

export default App