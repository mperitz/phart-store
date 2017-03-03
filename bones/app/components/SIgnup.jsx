import React from 'react'
import { browserHistory } from 'react-router'

export const Signup = ({ signUp, auth }) => {
  // the comment below is how to redirect, but we cant get it to work based on true or false bc of promises
  return (
  <form onSubmit={evt => {
    evt.preventDefault()
    {/*const signUpSuccessBool = signUp(evt.target)
    if (signUpSuccessBool) browserHistory.push('/')*/}
    signUp(evt.target)
  } }>
    <ul>
      <li>Name</li><input name="name" />
      <li>Email</li><input name="email" />{auth === false ? <span>   That email is unavailable</span> : null}
      <li>About Me</li><input name="aboutMe" />
      <li>Username</li><input name="username" />
      <li>Password</li><input name="password" type="password" />
      <input type="submit" value="Sign Up" />
    </ul>
  </form>
)}

import {signUp} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {signUp},
)(Signup)
