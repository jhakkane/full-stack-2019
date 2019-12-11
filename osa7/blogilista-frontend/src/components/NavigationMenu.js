import React from 'react'
import { connect } from 'react-redux'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'
import {
  Link, withRouter
} from 'react-router-dom'

const NavigationMenu = ({ loggedInUser, setLoggedInUser, ...props }) => {

  const padding = { padding: 5 }
  const menu = { backgroundColor: 'lightgray' }

  const handleLogout = () => {
    setLoggedInUser(null)
    window.localStorage.clear()
    props.history.push('/')
  }

  if (!loggedInUser) {
    return null
  }

  return (
    <p style={menu}>
      <Link style={padding} to="/blogs">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      {loggedInUser.name} logged in
      <button onClick={handleLogout}>
        Logout
      </button>
    </p>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  setLoggedInUser,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationMenu))