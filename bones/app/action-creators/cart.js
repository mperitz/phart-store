import { RECEIVE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../constants'
import axios from 'axios'

export const receiveCart = items => ({
  type: RECEIVE_CART,
  items
})

export const addToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})

export const removeFromCart = itemToBeRemoved => ({
  type: REMOVE_ITEM_FROM_CART,
  itemToBeRemoved
})

export const fetchCart = userId => {
  return dispatch => {
    axios.get(`/api/orders/${userId}`)
    .then(result => {
      console.log(result)
      return result.data.filter(order => {
        return order.status === 'In Cart'
      })
    })
    .then(cart => {
      dispatch(receiveCart(cart))
    })
    .catch(err => console.error(err))
  }
}

/*
When someone logged in adds an item to their cart:
1. Front end state needs to add that item to state.cart.list (done)
2. Axios.post
    a. Check if there is already an order with "In Cart" status
    b. If so, add an order item for state.items.selected with the proper order_id
    c. If not, create a new order, and then do step 2b.
*/

export const addCartItemToOrder = item => {
  return dispatch => {
    axios.post('something')
  }
}

export const removeItemFromOrder = item => {
  return dispatch => {
    axios.delete('something')
  }
}
