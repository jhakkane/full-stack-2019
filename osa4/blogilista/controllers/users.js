const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {id: 1, url:1, title: 1, author: 1})
  return response.json(users.map(blog => blog.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const data = request.body

    if (!data.password || data.password.length <= 3) {
      return response.status(400).json({error: 'Password is invalid'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)

    const user = new User({
      username: data.username,
      passwordHash: passwordHash,
      name: data.name
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter