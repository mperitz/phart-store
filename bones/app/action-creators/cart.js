import { RECEIVE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from '../constants'
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

export const clearCart = () => ({
  type: CLEAR_CART
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
      console.log('HERE IS THE CART!!!', cart)
      if (cart.length) {
        const modifiedCart = cart[0].orderItems.map(item => {
          console.log(item)
          return ({
            id: item.id,
            item_id: item.item_id,
            name: item.items[0].name || '',
            profile_image: item.items[0].profile_image || '',
            order_id: item.order_id,
            price: item.price,
            quantity: item.quantity,
            created_at: item.created_at,
            updated_at: item.updated_at
          })
        })
        dispatch(receiveCart(modifiedCart))
      }
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

export const addToCartAndDb = (item, userId) => {
  return dispatch => {
    axios.post(`/api/orders/cart/${userId}`, {
      item,
      quantity: 1
    })
    .then(() => {
      dispatch(fetchCart(userId))
    })
    .catch(err => console.error(err))
  }
}

export const removeItemFromOrder = (item, userId) => {
  return dispatch => {
    axios.put(`/api/orders/cart/${userId}`, {
      item
    })
    .then((res) => {
      dispatch(removeFromCart(item))
    })
    .catch(err => console.error(err))
  }
}
