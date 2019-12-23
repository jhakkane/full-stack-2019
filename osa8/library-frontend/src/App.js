import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks'

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title, author, published, genres
    }
  }
`

const ALL_AUTHORS = gql`
  { 
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  { 
    allBooks {
      title,
      author,
      published,
      genres,
      id
    }
  }
`

const UPDATE_AUTHOR = gql`
 mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name, born
  }
 }
`

const App = () => {
  const [page, setPage] = useState('authors')

  const [addBook] = useMutation(
    ADD_BOOK, 
    {
      refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
    }
  );

  const [updateAuthor] = useMutation(
    UPDATE_AUTHOR,
    {
      refetchQueries: [{query: ALL_AUTHORS}]
    }
  )

  const authorData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} 
        authorData={authorData}
        updateAuthor={updateAuthor}
      />

      <Books
        show={page === 'books'} bookData={bookData}
      />

      <NewBook
        show={page === 'add'} addBook={addBook}
      />

    </div>
  )
}

export default App