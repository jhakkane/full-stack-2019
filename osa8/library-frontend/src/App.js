import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks'

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title, 
      author {
        name
      }, 
      published,
      genres
    }
  }
`

const ALL_AUTHORS = gql`
  query allAuthors { 
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) { 
    allBooks(genre: $genre) {
      title,
      author {
        name
      },
      published,
      genres,
      id
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
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

const ME = gql`
  { 
    me {
      username,
      favoriteGenre
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0] ? error.graphQLErrors[0].message : 'Operation failed')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const client = useApolloClient()

  const [addBook] = useMutation(
    ADD_BOOK, 
    {
      onError: handleError,
      refetchQueries: [
        'allBooks', 
        'allAuthors', 
        'allRecommendations'
      ]
    }
  );

  const [login] = useMutation(
    LOGIN,
    {
      onError: handleError
    }
  )

  const [updateAuthor] = useMutation(
    UPDATE_AUTHOR,
    {
      onError: handleError,
      refetchQueries: [{query: ALL_AUTHORS}]
    }
  )

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const authorData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)
  const currentUserData = useQuery(ME)

  return (
    <div>
      {errorNotification()}

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button> }
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'} 
        authorData={authorData}
        updateAuthor={updateAuthor}
        loggedIn={token}
      />

      <Books
        show={page === 'books'} 
        bookData={bookData}
      />

      <NewBook
        show={page === 'add'} 
        addBook={addBook}
      />

      <Recommendations
        show={page === 'recommendations'} 
        currentUserData={currentUserData}
      />

      <Login
        show={page === 'login'} 
        login={login} 
        setToken={setToken}
        setPage={setPage}
        currentUserData={currentUserData}
      />
    </div>
  )
}

export default App