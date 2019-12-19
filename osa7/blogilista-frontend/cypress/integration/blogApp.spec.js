const uuidv1 = require('uuid/v1');

describe('Blog app ', function() {

  function resetDatabase() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Spede P',
      username: 'spede1',
      password: 'spede123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  }

  function login() {
    cy.visit('/')
    cy.get('[data-cy=username]').type('spede1')
    cy.get('[data-cy=password]').type('spede123')
    cy.get('[data-cy=login]').click()
  }

  beforeEach(function() {
    resetDatabase();
    login();
  })

  it('succeeds in logging in and out', function() {
    cy.get('[data-cy=logout]').click()
    cy.contains('Login')
  })

  it('is possible to create a new blog', function() {
    const title = `title-${uuidv1()}`
    cy.contains('New blog').click()
    cy.get('[data-cy=title]').type(title)
    cy.get('[data-cy=author]').type('author')
    cy.get('[data-cy=url]').type('url')
    cy.get('[data-cy=submit-blog]').click()
    cy.contains(title)
    cy.get('[name=blog-link]').first().click()
    cy.contains('Comments')
  })

  it('is possible to navigate to user page', function() {
    cy.get('[data-cy=users-link]').click()
    cy.get('[name=user-link]').first().click()
    cy.contains('Added blogs')
    cy.get('[data-cy=blogs-link]').click()
  })

})