import React from 'react'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <ul>
      <li>Email<input name="username" /></li>
      <li>Password<input name="password" type="password" /></li>
      <input type="submit" value="Login" />
    </ul>
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  null,
  {login},
)(Login)
