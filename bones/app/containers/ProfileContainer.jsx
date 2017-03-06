import { connect } from 'react-redux'
import Profile from '../components/Profile'
import { fetchOrders } from '../action-creators/orders'

const mapStateToProps = state => ({
  orders: state.orders.list
})

const mapDispatchToProps = dispatch => ({
  // loadOrders: orders => {
  //   dispatch(getOrders(item))
  // }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
