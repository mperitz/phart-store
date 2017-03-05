import {RECEIVE_BANDS, RECEIVE_BAND_ID} from '../constants'

const initialState = {
  listAll: [],
  selectedList: []
}

export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

    case RECEIVE_BANDS:
      newState.listAll = action.bands
      break

    case RECEIVE_BAND_ID:
      newState.selectedList.push(action.bandId)
      break

    default:
      return state

  }

  return newState

}

