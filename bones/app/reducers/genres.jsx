import {RECEIVE_GENRES, RECEIVE_GENRE_ID} from '../constants'

const initialState = {
  listAll: [],
  selectedList: []
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case RECEIVE_GENRES:
      newState.listAll = action.genres
      break

    case RECEIVE_GENRE_ID:
      newState.selectedList.push(action.genreId)
      break

    default:
      return state

  }

  return newState

}
