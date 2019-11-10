const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('with initial data', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
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

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsInDB = await helper.getBlogsInDB()
      expect(blogsInDB.length).toBe(helper.initialBlogs.length + 1)
      const blogsInDBFormatted = blogsInDB.map(blog => helper.removeId(blog))
      expect(blogsInDBFormatted).toContainEqual(newBlog)
    })
    
    test('likes defaults to zero', async () => {
      const newBlog =   {
        title: 'Stack Stack',
        author: 'S. Salminen',
        url: 'www.yle.fi',
      }
      const response = await api
        .post('/api/blogs')
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
      await api
        .post('/api/blogs')
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
      await api
        .post('/api/blogs')
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
      await api
        .delete(`/api/blogs/${deletableBlog.id}`)
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