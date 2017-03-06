import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import { logout } from '../reducers/auth.jsx'
import { fetchOrders } from '../action-creators/orders'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  },
  fetchOrders: (userId) => {
	dispatch(fetchOrders(userId))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
