import { connect } from 'react-redux'
import ShoppingCart from '../components/ShoppingCart'
import { removeItemFromOrder } from '../action-creators/cart'

const mapStateToProps = state => ({
  cart: state.cart.list,
  user: state.auth
})

const mapDispatchToProps = dispatch => ({
  removeItemFromCart: (item, userId) => {
    dispatch(removeItemFromOrder(item, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
