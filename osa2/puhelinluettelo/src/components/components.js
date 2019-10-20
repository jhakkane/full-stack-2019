import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.style}>
      {message.text}
    </div>
  )
}

const Filter = ({query, handleQuery}) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handleQuery}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, deletePerson}) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => deletePerson(person)}>delete</button>
  </li>  
)

const Persons = ({persons, query, deletePerson}) => {
  const personList = () => (
      persons.filter(
        person => !query || person.name.toLowerCase().includes(query.toLowerCase()))
      .map(person => 
        <Person key={person.id} person={person} deletePerson={deletePerson}/>)
  )

  return (
    <ul>
      {personList()}
    </ul>
  )
}

export {Filter, PersonForm, Persons, Notification}