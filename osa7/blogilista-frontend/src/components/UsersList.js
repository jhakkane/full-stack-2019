import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Link,
  useRouteMatch,
} from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'
import userService from '../services/users'

const UserList = ({ initializeUsers, ...props }) => {

  let match = useRouteMatch()

  useEffect(() => {
    userService
      .getAll()
      .then(users => initializeUsers(users))
  }, [initializeUsers])

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {props.sortedUsers.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={`${match.path}/${user.id}`}>{user.name}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => {
  return {
    sortedUsers: (() => {
      const sortedUsers = Array.from(state.users)

      return sortedUsers
    })()
  }
}

const mapDispatchToProps = {
  initializeUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)