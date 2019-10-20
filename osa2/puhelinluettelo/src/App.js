import React, { useState, useEffect } from 'react'
import {Filter, PersonForm, Persons, Notification} from './components/components.js'
import dataservice from './services/dataservice.js'
import './index.css'
 
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    dataservice
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const createNotification = (text, style) => {
    style = style || 'success'
    let newMessage = {text, style}
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let origPerson = persons.find(person => person.name === newName)
    if (origPerson) {
      confirmUpdate(origPerson)
    } else {
      addNewPerson();
    }
  }

  const addNewPerson = () => {
    const newPerson = { name: newName, number: newNumber }
    dataservice
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        createNotification(`Added ${newName}`)
      })
      .catch(error => {
        const errorText = error.response.data.error
        createNotification(errorText, 'error')
      })
    initNameAndNumber()
  }

  const confirmUpdate = (origPerson) => {
    const msg = `${newName} is already added to phonebook. Replace old number with a new one?`
    const confirmed = window.confirm(msg)
    if (confirmed) {
      updatePerson(origPerson)
      initNameAndNumber()
    }
  }

  const updatePerson = (origPerson) => {
    const newPerson = { name: newName, number: newNumber }
    dataservice
      .update(origPerson.id, newPerson)
      .then(updatedPerson => {
        let newPersons = persons.filter(person => person.id !== origPerson.id)
        newPersons.push(updatedPerson)
        setPersons(newPersons)
        createNotification(`Person ${newName} has been updated!`)
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== origPerson.id))
        createNotification(`Person ${newName} has already been removed from the server!`, 'error')
      })
  }

  const initNameAndNumber = () => {
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (deletablePerson) => {
    const msg = `Delete ${deletablePerson.name}?`
    const confirmed = window.confirm(msg);
    if (confirmed) {
      dataservice
        .remove(deletablePerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletablePerson.id))
          createNotification(`Person ${deletablePerson.name} has been deleted!`)
        })
        .catch(() => {
          setPersons(persons.filter(person => person.id !== deletablePerson.id))
          createNotification(`Person ${deletablePerson.name} has already been deleted!`)
        })
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleQuery = (event) => setQuery(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter query={query} handleQuery={handleQuery} />

      <h2>Add a new</h2>

      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={persons} query={query} deletePerson={deletePerson}/>
    </div>
  )

}

export default App