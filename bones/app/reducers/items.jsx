import {RECEIVE_ITEMS, RECEIVE_ITEM} from '../constants'

const initialState = {
  list: [],
  selected: {}
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case RECEIVE_ITEMS:
      newState.list = action.items
      break

    case RECEIVE_ITEM:
      newState.selected = action.item
      break

    default:
      return state

  }

  return newState

}
