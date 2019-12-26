import React from 'react'
import AuthorEditor from '../components/AuthorEditor'

const Authors = ({ authorData, loggedIn, show, updateAuthor }) => {

  if (!show) {
    return null
  }

  if (authorData.loading) {
    return <div>loading...</div>
  }
  
  const authors = authorData.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              author
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {loggedIn && <AuthorEditor updateAuthor={updateAuthor} authors={authors} />}
    </div>
  )
}

export default Authors