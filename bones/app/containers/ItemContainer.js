import Item from '../components/Item'
import { connect } from 'react-redux'
import { addToCart } from '../action-creators/cart'

const mapStateToProps = (state) => {
  return {
    selected: state.items.selected,
    comments: state.items.comments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => {
      dispatch(addToCart(item))
    }
  }
}

const ItemContainer = connect(mapStateToProps, mapDispatchToProps)(Item)

export default ItemContainer
