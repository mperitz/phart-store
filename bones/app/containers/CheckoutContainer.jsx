import { connect } from 'react-redux'
import Checkout from '../components/Checkout'
import axios from 'axios'

const mapStateToProps = state => ({
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  submitCheckout: (orderId, body) => {
    axios.put(`/api/orders/checkout/${orderId}`, body)
    .catch(err => console.error(err))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
