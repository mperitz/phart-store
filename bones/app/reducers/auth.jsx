import axios from 'axios'

const AUTHENTICATED = 'AUTHENTICATED'
const EMAIL_NOT_AVAILABLE = 'EMAIL_NOT_AVAILABLE'

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user
    // next case is if user enters an email in sign up that is already in the DB
    // updates state and shows a warning message
    case EMAIL_NOT_AVAILABLE:
      return action.emailBool
    default:
      return state
  }
}

export const authenticated = user => ({
  type: AUTHENTICATED, user
})
const emailNotAvailable = emailBool => ({
  type: EMAIL_NOT_AVAILABLE, emailBool
})

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(() => dispatch(authenticated(null)))

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const signUp = (eventTarget) =>
  dispatch =>
    axios.post('/api/auth/signup/local',
      {
        name: eventTarget.name.value,
        email: eventTarget.email.value,
        about_me: eventTarget.aboutMe.value,
        username: eventTarget.username.value,
        password: eventTarget.password.value
      })
      .then(response => {
        if (response.data.email) {
          dispatch(login(response.data.email, response.data.password))
        }
        else if (response.data.emailAvailable === false) {
          dispatch(emailNotAvailable(response.data.emailAvailable))
        }
      })
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export default reducer
