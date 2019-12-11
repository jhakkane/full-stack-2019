const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {id: 1, username: 1, name: 1})
    .populate('comments', {text: 1})
  return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } 
    if (decodedToken.id !== blog.user.toString()) {
      return response.status(401).json({error: 'only the blog creator can delete the blog'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const currentUser = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: currentUser._id
    })
  
    let savedBlog = await blog.save()
    savedBlog.user = currentUser
    currentUser.blogs = currentUser.blogs.concat(savedBlog._id)
    await currentUser.save()
    savedBlog = await Blog
      .findById(savedBlog.id)
      .populate('user', {id: 1, username: 1, name: 1})
      .populate('comments', {text: 1})
    
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const newData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, newData, {new: true})
      .populate('user', {id: 1, username: 1, name: 1})
      .populate('comments', {text: 1})
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    console.log(blog)

    const comment = new Comment({
      text: body.text,
      blog: blog._id
    })

    blog.comments.push(comment)

    await blog.save()
    await comment.save()   
    response.status(201).json(comment.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter