import {RECEIVE_ITEMS, RECEIVE_ITEM, RECEIVE_COMMENTS} from '../constants'

const initialState = {
  list: [],
  selected: {},
  comments: []
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

     case RECEIVE_COMMENTS:
      newState.comments = action.comments
      break

    default:
      return state

  }

  return newState

}
