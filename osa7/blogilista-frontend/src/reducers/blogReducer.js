const reducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE_BLOG':
    return (() => {
      const updatedBlog = action.data
      const newState = state.filter(blog => blog.id !== updatedBlog.id)
      newState.push(updatedBlog)
      return newState
    })()
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id
  }
}

export const updateBlog = (updatedBlog) => {
  return {
    type: 'UPDATE_BLOG',
    data: updatedBlog
  }
}

export default reducer