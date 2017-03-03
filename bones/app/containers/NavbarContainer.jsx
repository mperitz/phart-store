import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logout } from '../reducers/auth.jsx'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
