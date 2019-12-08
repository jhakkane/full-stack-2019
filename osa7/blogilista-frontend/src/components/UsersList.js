import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import userService from '../services/users'

const UserList = ({ initializeUsers, ...props }) => {

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
              {user.name}
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