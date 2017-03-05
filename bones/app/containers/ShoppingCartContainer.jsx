import { connect } from 'react-redux'
import ShoppingCart from '../components/ShoppingCart'

const mapStateToProps = state => ({
  cart: state.cart.list
})

export default connect(mapStateToProps, null)(ShoppingCart)
