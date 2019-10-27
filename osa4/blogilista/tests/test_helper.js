const Blog = require('../models/blog')

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

const getBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const removeId = blog => {
  const formattedBlog = {...blog}
  delete formattedBlog.id
  return formattedBlog
}

module.exports = {
  initialBlogs, getBlogsInDB, removeId
}