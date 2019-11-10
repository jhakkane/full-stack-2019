const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const testUserUsername = 'test'
const testUserPassword = 'testPassword'
const saltRounds = 10

const getInitialUser = async () => {
  return {
    username: testUserUsername,
    passwordHash: await bcrypt.hash(testUserPassword, saltRounds)
  }
}

const initialBlogs = [
  {
    title: 'Hull Stack',
    author: 'Sauli Rusi',
    url: 'www.google.fi',
    likes: 12
  },
  {
    title: 'Half Stack',
    author: 'Sepe Susi',
    url: 'www.wikipedia.fi',
    likes: 1
  },
]

const login = async api => {
  const token = await api
    .post('/api/login')
    .send({
      username: testUserUsername,
      password: testUserPassword
    })
  return token
}

const getBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const removeIrrelevantFields = blog => {
  const formattedBlog = {...blog}
  delete formattedBlog.id
  delete formattedBlog.user
  return formattedBlog
}

module.exports = {
  getInitialUser, getBlogsInDB, initialBlogs, login, removeIrrelevantFields
}