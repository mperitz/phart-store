import { RECEIVE_ORDERS, CLEAR_ORDERS } from '../constants'

const initialState = {
  list: []
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case RECEIVE_ORDERS:
      newState.list = action.orderItems
      break

    case CLEAR_ORDERS:
      newState.list = []
      break;

    default:
      return state

  }

  return newState

}