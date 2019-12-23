import React, { useState } from 'react'

const AuthorEditor = ({authors, updateAuthor}) => {
  
  const getFirstAuthor = () => {
    return authors.length > 0 ? authors[0].name : null
  }

  const [name, setName] = useState(getFirstAuthor())
  const [born, setBorn] = useState('')

  const handleChange = (event) => {
    console.log('handleChange')
    setName(event.target.value)
  }

  const submit = async (e) => {
    e.preventDefault()

    console.log('editing name')

    const author = {
      name,
      setBornTo: Number.parseInt(born),
    }

    updateAuthor({variables: author})
    setBorn('')
    setName(getFirstAuthor())
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={handleChange}>
          {authors.map(author => (
            <option key={author.name} value={author.name}>{author.name}</option>
          ))}
        </select>

        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update name</button>
      </form>
    </div>
  )
}


export default AuthorEditor