import { RECEIVE_ORDERS, CLEAR_ORDERS } from '../constants'
import axios from 'axios'

export const receiveOrders = orderItems => ({
    type: RECEIVE_ORDERS,
    orderItems
})

export const clearOrders = () => ({
    type: CLEAR_ORDERS
})

export const fetchOrders = (userId) => {
  return dispatch => {
    axios.get(`/api/users/${userId}/orderHistory`)
    .then(response => {
    	if(response.data[0]){
	      console.log('testing route', response.data)
          dispatch(receiveOrders(response.data))
	  }
    })
    .catch(console.error)
  }
}
