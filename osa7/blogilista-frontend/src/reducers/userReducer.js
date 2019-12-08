const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = (blogs) => {
  return {
    type: 'INIT_USERS',
    data: blogs
  }
}

export default reducer