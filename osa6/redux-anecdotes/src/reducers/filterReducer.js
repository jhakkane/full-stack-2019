const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.data;
    default:
      return state;
  }
}

export const changeFilter = (notification) => {
  return {
    type: 'CHANGE_FILTER',
    data: notification
  }
}

export default reducer