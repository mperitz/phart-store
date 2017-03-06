import { RECEIVE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, GET_TOTAL_ORDER_PRICE} from '../constants'
import axios from 'axios'

export const receiveCart = list => ({
  type: RECEIVE_CART,
  list
})

export const addToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})

export const removeFromCart = itemToBeRemoved => ({
  type: REMOVE_ITEM_FROM_CART,
  itemToBeRemoved
})

export const getTotalCartPrice = item => ({
  type: GET_TOTAL_ORDER_PRICE,
  price: item.price
})

export const fetchCart = userId => {
  return dispatch => {
    axios.get(`/api/orders/cart/${userId}`)
    .then(result => {
      return result.data.filter(order => {
        return order.status === 'In Cart'
      })
    })
    .then(cart => {
      const modifiedCart = cart[0].orderItems.map(item => {
        return ({
          id: item.id,
          item_id: item.item_id,
          name: item.items[0].name,
          profile_image: item.items[0].profile_image,
          order_id: item.order_id,
          price: item.price,
          quantity: item.quantity,
          created_at: item.created_at,
          updated_at: item.updated_at
        })
      })
      dispatch(receiveCart(modifiedCart))
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
