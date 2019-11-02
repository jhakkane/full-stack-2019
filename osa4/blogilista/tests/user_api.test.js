const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('without initial data', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('duplicate usernames not allowed', async () => {
    const newUser = {
      username: 'kayttaja',
      password: 'salasana',
      name: 'Kalle Käyttäjä'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toMatch(/expected `name` to be unique/)
  })

  test('short passwords not allowed', async () => {
    const newUser = {
      username: 'kayttaja',
      password: 'ab',
      name: 'Kalle Käyttäjä'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toMatch(/Password is invalid/)
  })

  test('missing passwords not allowed', async () => {
    const newUser = {
      username: 'kayttaja',
      name: 'Kalle Käyttäjä'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error).toMatch(/Password is invalid/)
  })

})

afterAll(() => {
  mongoose.connection.close()
})