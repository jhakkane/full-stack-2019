import React from 'react';
import AnectodeForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = (props) => {
  return (
    <div>
      <AnecdoteList store={props.store}/>
      <AnectodeForm store={props.store}/>
    </div>
  )
}

export default App