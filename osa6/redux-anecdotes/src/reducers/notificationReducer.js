const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.data;
    default:
      return state;
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