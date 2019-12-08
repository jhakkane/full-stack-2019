var _ = require('lodash')

const favoriteBlog = blogs => {
  if (!blogs || !blogs.length) return null
  const maxLikes = blogs.reduce((max, blog) => Math.max(max, blog.likes), 0)
  let favorite = blogs.find(blog => blog.likes === maxLikes)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const totalLikes = blogs => {
  return blogs.reduce((total, blog) => blog.likes + total, 0)
}

const mostBlogs = blogs => {
  const authorToBlogCount = _.countBy(blogs, blog => blog.author)
  const author = _.maxBy(_.keys(authorToBlogCount), author => authorToBlogCount[author])
  return {
    author: author,
    blogs: authorToBlogCount[author]
  }
}

const mostLikes = blogs => {
  const authorToBlogs = _.groupBy(blogs, blog => blog.author)
  const authorToLikes = _.mapValues(authorToBlogs, blogs => totalLikes(blogs))
  const author = _.maxBy(_.keys(authorToLikes), author => authorToLikes[author])
  return {
    author: author,
    likes: authorToLikes[author]
  }
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}