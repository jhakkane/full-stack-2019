const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'ADD_NOTIFICATION',
        data: null
      })
    }, time * 1000)
  }
}

export const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    data: notification
  }
}

export const removeNotification = () => {
  return {
    type: 'ADD_NOTIFICATION',
    data: null
  }
}

export default reducer