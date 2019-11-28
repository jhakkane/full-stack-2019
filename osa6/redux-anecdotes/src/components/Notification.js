import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.store.getState().notification;
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return null;
  }
}

export default Notification