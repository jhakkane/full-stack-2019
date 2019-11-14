import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog', () => {
  let component
  let mockOnClick = jest.fn()

  beforeEach(() => {
    let blog = {
      title: 'The Title',
      author: 'The Author',
      likes: 1000
    }
    component = render(<SimpleBlog blog={blog} onClick={mockOnClick}/>)
  })

  test('renders fields', () => {
    expect(component.container).toHaveTextContent('The Title')
    expect(component.container).toHaveTextContent('The Author')
    expect(component.container).toHaveTextContent('blog has 1000 likes')
  })

  test('clicking the like button twice calls the onClick twice', async () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockOnClick.mock.calls.length).toBe(2)
  })

})

