import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component
  let addLike = jest.fn()
  let removeBlog = jest.fn()
  let user = { username: 'admin' }

  beforeEach(() => {
    let blog = {
      title: 'The Title',
      author: 'The Author',
      likes: 1000,
      user: {
        username: 'admin'
      }
    }
    component = render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>)
  })

  test('initially only title and author are visible', () => {
    expect(component.container).toHaveTextContent('The Title')
    expect(component.container).toHaveTextContent('The Author')
    expect(component.container).not.toHaveTextContent('likes')
    expect(component.container).not.toHaveTextContent('Added by')
    expect(component.container).not.toHaveTextContent('Remove')
  })

  test('after click everything is visible', () => {
    const div = component.container.querySelector('.blog')
    fireEvent.click(div)
    expect(component.container).toHaveTextContent('The Title')
    expect(component.container).toHaveTextContent('The Author')
    expect(component.container).toHaveTextContent('likes')
    expect(component.container).toHaveTextContent('Added by')
    expect(component.container).toHaveTextContent('Remove')
  })
})

