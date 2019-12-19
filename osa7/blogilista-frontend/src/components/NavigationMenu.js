import React from 'react'
import { connect } from 'react-redux'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { setLoggedInUser } from '../reducers/loggedInUserReducer'
import {
  Link, withRouter
} from 'react-router-dom'

const NavigationMenu = ({ loggedInUser, setLoggedInUser, ...props }) => {

  const padding = { padding: 5 }

  const handleLogout = () => {
    setLoggedInUser(null)
    window.localStorage.clear()
    props.history.push('/')
  }

  if (!loggedInUser) {
    return null
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link data-cy="blogs-link" style={padding} to="/blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link data-cy="users-link" style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Navbar.Text>
            {loggedInUser.name} logged in
          </Navbar.Text>
          <Button data-cy="logout" variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  setLoggedInUser,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationMenu))