import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)

  if (!props.notification) {
    return null
  }

  return (
    <div className={props.notification.style}>
      {props.notification.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)