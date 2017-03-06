import { connect } from 'react-redux'
import ShoppingCart from '../components/ShoppingCart'
import { removeFromCart } from '../action-creators/cart'

const mapStateToProps = state => ({
  cart: state.cart.list
})

const mapDispatchToProps = dispatch => ({
  removeItemFromCart: item => {
    dispatch(removeFromCart(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
