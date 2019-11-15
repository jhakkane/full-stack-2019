import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )

    const loginForm = component.container.querySelector('.loginForm')
    expect(loginForm).toBeDefined()
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
    const newBlogButton = component.queryByText('New blog')
    expect(newBlogButton).toBe(null)
  })

  test('if user is logged in, notes and new blog form are rendered', async() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('New blog')
    )

    const loginForms = component.container.querySelectorAll('.loginForm')
    expect(loginForms.length).toBe(0)
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(2)
    const newBlogButton = component.getByText('New blog')
    expect(newBlogButton).toBeDefined()
  })
})