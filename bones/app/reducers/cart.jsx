import { RECEIVE_CART, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from '../constants'

const initialState = {
  list: [],
  totalPrice: 0
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case RECEIVE_CART:
      newState.list = action.list
      break

    case CLEAR_CART:
      newState.list = []
      break

    case ADD_ITEM_TO_CART:
      newState.list = newState.list.concat(action.item)
      break

    case REMOVE_ITEM_FROM_CART:
      newState.list = newState.list.filter(item => item.id !== action.itemToBeRemoved.id)
      break

    default:
      return state

  }

  return newState

}
