import React, {useState} from 'react'

const Books = ({bookData, show}) => {

  const [genre, setGenre] = useState(null)

  if (!show) {
    return null
  }

  if (bookData.error) {
    return <div>error</div>
  }
  if (bookData.loading) {
    return <div>loading...</div>
  }

  const books = bookData.data.allBooks

  const changeGenre = (genre) => {
    setGenre(genre)
    const variables = { genre }
    bookData.refetch(variables)
  }

  const getGenres = () => {
    let genres = []
    books.forEach(book => {
      genres = genres.concat(book.genres)
    })
    return Array.from(new Set(genres))
  }

  return (
    <div>
      <h2>books</h2>

      {genre &&
        <p>in genre <b>{genre}</b></p>
      }

      <table>
        <tbody>
          <tr>
            <th>
              book
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {!genre && getGenres().map(g =>
          <button key={g} onClick={() => changeGenre(g)}>
            {g}
          </button>
        )}
        <button onClick={() => changeGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books