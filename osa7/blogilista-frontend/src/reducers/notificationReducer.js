const reducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (text, style = 'success', time = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: {
        text: text,
        style: style
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        data: null
      })
    }, time * 1000)
  }
}

export default reducer