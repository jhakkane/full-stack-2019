import _ from 'lodash'
import React, { useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks'

export const ALL_RECOMMENDATIONS = gql`
  query allRecommendations($genre: String) {
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

const Recommendations = ({currentUserData, show}) => {

  const [getRecommendations, recommendationData] = useLazyQuery(ALL_RECOMMENDATIONS)
  const genre = _.get(currentUserData, ['data', 'me', 'favoriteGenre']) 
  useEffect(() => {
    if (!genre) {
      return;
    } else {
      getRecommendations({ variables: { genre } })
    }
  }, [genre, getRecommendations])


  if (!show) {
    return null
  }
  if (currentUserData.error) {
    return <div>error</div>
  }
  if (currentUserData.loading) {
    return <div>loading...</div>
  }
  if (!currentUserData.data || !currentUserData.data.me) {
    return null
  }

  const books = recommendationData.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{_.get(currentUserData, ['data', 'me', 'favoriteGenre'])}</b>
      </p>
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
    </div>
  )

}

export default Recommendations