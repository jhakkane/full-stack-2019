const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('with initial data', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const initialUser = await helper.getInitialUser()
    const user = new User(initialUser)
    const savedUser = await user.save()

    const blogs = helper.initialBlogs.map(blog => { 
      blog.user = savedUser._id
      return new Blog(blog)
    })
    
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
  })

  test('blogs are returned in JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  
  test('blogs have an id field', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    response.body.forEach(blog =>  expect(blog.id).toBeDefined())
  })

  describe('creation of new blogs', () => {
    test('new blog can be created', async () => {
      const newBlog =   {
        title: 'Stack Stack',
        author: 'S. Salminen',
        url: 'www.yle.fi',
        likes: 10
      }

      const loginResponse = await helper.login(api)

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + loginResponse.body.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsInDB = await helper.getBlogsInDB()
      expect(blogsInDB.length).toBe(helper.initialBlogs.length + 1)
      const blogsInDBFormatted = blogsInDB.map(blog => helper.removeIrrelevantFields(blog))
      expect(blogsInDBFormatted).toContainEqual(newBlog)
    })
    
    test('likes defaults to zero', async () => {
      const newBlog =   {
        title: 'Stack Stack',
        author: 'S. Salminen',
        url: 'www.yle.fi',
      }

      const loginResponse = await helper.login(api)

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + loginResponse.body.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(response.body.likes).toBe(0)
    })
    
    test('url is required', async () => {
      const newBlog =   {
        title: 'Stack Stack',
        author: 'S. Salminen',
      }

      const loginResponse = await helper.login(api)

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + loginResponse.body.token)
        .send(newBlog)
        .expect(400)
    
      const blogsInDB = await helper.getBlogsInDB()
      expect(blogsInDB.length).toBe(helper.initialBlogs.length)
    })
    
    test('title is required', async () => {
      const newBlog =   {
        author: 'S. Salminen',
        url: 'www.google.com'
      }

      const loginResponse = await helper.login(api)

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + loginResponse.body.token)
        .send(newBlog)
        .expect(400)
    
      const blogsInDB = await helper.getBlogsInDB()
      expect(blogsInDB.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deletion', () => {
    test('blog can be deleted', async () => {
      const blogsInStart = await helper.getBlogsInDB()
      const deletableBlog = blogsInStart[0]

      const loginResponse = await helper.login(api)

      await api
        .delete(`/api/blogs/${deletableBlog.id}`)
        .set('Authorization', 'Bearer ' + loginResponse.body.token)
        .expect(204)
      const blogsInEnd = await helper.getBlogsInDB()
      expect(blogsInEnd.length).toBe(helper.initialBlogs.length - 1)
      const ids = blogsInEnd.map(blog => blog.id)
      expect(ids).not.toContain(deletableBlog.id)
    })
  })

  describe('updating', () => {
    test('likes can be updated', async () => {
      const blogsInStart = await helper.getBlogsInDB()
      const blogToUpdate = blogsInStart[0]
      blogToUpdate.likes = 1000
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
      const blogsInEnd = await helper.getBlogsInDB()  
      const blog = blogsInEnd.find(blog => blog.id === blogToUpdate.id)
      expect(blog.likes).toBe(1000)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})