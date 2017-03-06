import Item from '../components/Item'
import { connect } from 'react-redux'
import { addToCart } from '../action-creators/cart'
import { createComment } from '../action-creators/items'

const mapStateToProps = (state) => {
  const authId = state.auth ? state.auth.id : 'Signup or login to add a Comment'
  return {
    selected: state.items.selected,
    comments: state.items.comments,
    userId: authId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => {
      dispatch(addToCart(item))
    },

    addComment: input => {
       dispatch(createComment(input))
    }

  }
}

const ItemContainer = connect(mapStateToProps, mapDispatchToProps)(Item)

export default ItemContainer
